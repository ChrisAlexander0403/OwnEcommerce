import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

import transporter from "../config/mailer";
import redisClient from "../config/redis";
import User from "../models/user";
import Client from "../models/client";
import { decryptAppData } from "../utils/encryption";
import { generateAccessToken, generateRefreshToken, generateToken } from "../utils/authentication";
import verifyAccountLayout from '../mails/verifyAccount.layout';

export const login = async (_, { email, password }, req) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    email = email.toLowerCase();

    const client = await Client.findOne({ email });
    
    if (client) {
        if (client.status === 'UNVERIFIED') {
            return {
                status: 401,
                message: "Confirm account to proceed"
            }
        }

        if (client.status === 'BLOCKED') {
            return {
                status: 403,
                message: "Forbidden"
            }
        }

        let key = ip + '_' + email;
        let attempts = key + '_attempts';

        if (await bcrypt.compare(password, client.password)) {
            const accessToken = generateAccessToken(client);
            const refreshToken = generateRefreshToken(client);
            await Client.updateOne({ email: email }, { $push: { tokens: refreshToken } });

            try {
                await redisClient.del(attempts);
                await redisClient.del(key);
            } catch {

            }

            return {
                status: 200,
                message: 'Logged in successfully',
                authenticatedClient: {
                    client: {
                        _id: client._id,
                        firstname: decryptData(email, client.firstname),
                        lastname: decryptData(email, client.lastname),
                        email: client.email,
                        phone: decryptData(email, client.phone),
                        birthdate: decryptData(email, client.birthdate),
                        createdAt: client.createdAt,
                        updatedAt: client.updatedAt
                    },
                    tokens: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }
        }

        try {
            let [response] = await redisClient.multi().incr(key).exec();
            if (response[1] === 1) await redisClient.expire(key, 60*60);
            if (response[1] >= 5) {
                if (response[1] === 5){
                    let [attemptsResponse] = await redisClient.multi().incr(attempts).exec();
                    if (attemptsResponse[1] === 1) {
                        await redisClient.expire(key, 60);
                        await redisClient.expire(attempts, 60*60);
                    }
                    if (attemptsResponse[1] === 2) await redisClient.expire(key, 60*5);
                    if (attemptsResponse[1] === 3) await redisClient.expire(key, 60*60);
                    if (attemptsResponse[1] === 4) {
                        const code = uuidv4();
                        const encryptedCode = await bcrypt.hash(code, 12);  
                        const client = await Client.findOne({ email });
                        client.verificationCode = encryptedCode;
                        client.status = 'BLOCKED';
                        await client.save();
                        const token = generateToken({ email, code });
                        await transporter.sendMail({
                            from: '"Fred Foo" <foo@example.com>',
                            to: email,
                            subject: 'Seguridad de la cuenta',
                            text: 'Seguridad de la cuenta',
                            html: verifyAccountLayout(decryptData(email, client.firstname))
                        });
                        console.log(token);

                        return {
                            status: 403,
                            message: "Forbidden"
                        }
                    }
                }
                return new Error(`Too many attemps, try again in ${await redisClient.ttl(key)}`);
            }
        } catch(e) {
            console.log(e);
        }

        return {
            status: 400,
            message: "Incorrect password"
        }

    }
    try {
        const user = await User.findOne({ email });

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                await User.updateOne({ email }, { $push: { tokens: refreshToken } });

                return {
                    status: 200,
                    message: 'Logged in successfully',
                    authenticatedUser: {
                        user: {
                            _id: user._id,
                            firstname: decryptAppData(user.firstname),
                            lastname: decryptAppData(user.lastname),
                            email: user.email,
                            rol: user.rol,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt
                        },
                        tokens: {
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }
                    }
                }
            }

            return {
                status: 400,
                message: "Incorrect password"
            }
        }

        return { 
            status: 404,
            message: 'User not found'
        }
    } catch(e) {
        console.log(e)
        return {
            status: 500,
            message: "something went wrong"
        }
    }
    
}

export const refreshUserSession = async (_, { refreshToken }) => {
    if (!refreshToken) {
        return {
            status: 401,
            message: 'Unauthorized'
        }
    }

    const user = await User.findOne({ tokens: { $in: refreshToken } }).exec();

    if (!user) {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if(err) return {
                status: 403,
                message: "Forbidden"
            }
            const compromisedUser = await User.findOne({ email: decoded.email}).exec();
            if (compromisedUser) {
                compromisedUser.tokens = [];
                await compromisedUser.save();
            }
            return {
                status: 403,
                message: "Forbidden"
            }
        });
    }

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
        async (err, decoded) => {
        if(err) {
            await User.updateOne({ email: user.email }, {
                $pull: {
                    tokens: {
                        $in: refreshToken
                    }
                }
            });
        }
        if (err || user.email !== decoded.email) {
            return {
                status: 403,
                message: "Forbidden"
            }
        }

        const newRefreshToken = generateRefreshToken(user);
        const newAccessToken = generateAccessToken(user);   

        try {
            await User.updateOne({ email: user.email }, { 
                $pull: {
                    tokens: {
                        $in: refreshToken
                    }
                } 
            });
            await User.updateOne({ email: user.email }, { $push: { tokens: newRefreshToken } });
            return {
                status: 201,
                message: "Session refreshed",
                tokens: {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                }
            };
        } catch {
            return {
                status: 500,
                message: "Something went wrong"
            };
        }
    });
}

export const refreshClientSession = async (_, { refreshToken }) => {
    if (!refreshToken) {
        return {
            status: 401,
            message: 'Unauthorized'
        }
    }

    const client = await Client.findOne({ tokens: { $in: refreshToken } }).exec();

    if (!client) {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if(err) return {
                status: 403,
                message: "Forbidden"
            }
            const compromisedClient = await Client.findOne({ email: decoded.email}).exec();
            if (compromisedClient) {
                compromisedClient.tokens = [];
                await compromisedClient.save();
            }
            return {
                status: 403,
                message: "Forbidden"
            }
        });
    }

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
        async (err, decoded) => {
        if(err) {
            await Client.updateOne({ email: client.email }, {
                $pull: {
                    tokens: {
                        $in: refreshToken
                    }
                }
            });
        }
        if (err || client.email !== decoded.email) {
            return {
                status: 403,
                message: "Forbidden"
            }
        }

        const newRefreshToken = generateRefreshToken(client);
        const newAccessToken = generateAccessToken(client);   

        try {
            await Client.updateOne({ email: client.email }, { 
                $pull: {
                    tokens: {
                        $in: refreshToken
                    }
                } 
            });
            await Client.updateOne({ email: client.email }, { $push: { tokens: newRefreshToken } });
            return {
                status: 201,
                message: "Session refreshed",
                tokens: {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                }
            };
        } catch {
            return {
                status: 500,
                message: "Something went wrong"
            };
        }
    });
}

export const resetPassword = async () => {

} 
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// import transporter from "../utils/mailer";
import User from "../models/user";
import Client from "../models/client";
import { decryptData } from "../utils/encryption";
import { generateAccessToken, generateRefreshToken } from "../utils/authentication";

export const login = async (_, { email, password }) => {
    email = email.toLowerCase();

    const client = await Client.findOne({ email: email });
    
    if (client) {
        if (await bcrypt.compare(password, client.password)) {
            const accessToken = generateAccessToken(client);
            const refreshToken = generateRefreshToken(client);
            await Client.updateOne({ email: email }, { $push: { tokens: refreshToken } });

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

        return {
            status: 400,
            message: "Incorrect password"
        }

    }

    const user = await User.findOne({ email: email });

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            await User.updateOne({ email: email }, { $push: { tokens: refreshToken } });

            return {
                status: 200,
                message: 'Logged in successfully',
                authenticatedUser: {
                    user: {
                        _id: user._id,
                        firstname: decryptData(email, user.firstname),
                        lastname: decryptData(email, user.lastname),
                        email: user.email,
                        phone: decryptData(email, user.phone),
                        birthdate: decryptData(email, user.birthdate),
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
        message: 'Client not found'
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
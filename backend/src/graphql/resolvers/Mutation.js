import User from "../../models/user";
import bcrypt from 'bcrypt';
import { decryptData, encrypt, encryptData, generateKeys } from "../../utils/encryption";
import { generateAccessToken, generateRefreshToken } from "../../utils/authentication";

const Mutation = {
    register: async (_, { firstname, lastname, email, password, phone, birthdate }) => {
        let response = {};
        email = email.toLowerCase();
        
        const user = await User.findOne({ email: email });
        if (user) {
            response = {
                status: 409,
                message: "User already exists"
            };
        }
        else {
            const publicKey = generateKeys(email);
            const { iv, encrypted } = encrypt(publicKey);
            const encryptedPassword = await bcrypt.hash(password, 12);

            try {
                const newUser = new User({
                    firstname: encryptData(publicKey, firstname),
                    lastname: encryptData(publicKey, lastname),
                    email: email,
                    password: encryptedPassword,
                    phone: encryptData(publicKey, phone),
                    birthdate: encryptData(publicKey, birthdate),
                    encryption: {
                        public: encrypted,
                        iv: iv
                    }
                });
                await newUser.save();
                response = {
                    status: 201,
                    message: "User created succesfully"
                };
            } catch {
                response = {
                    status: 500,
                    message: "Something went wrong, try again later"
                }
            }
        }

        return response;
    },

    login: async (_, { email, password }) => {
        let response = {};
        email = email.toLowerCase();

        const user = await User.findOne({ email: email });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(accessToken);
                await User.updateOne({ email: email }, { $push: { tokens: refreshToken } });

                response = {
                    status: 200,
                    message: 'Logged in successfully',
                    node: {
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
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            } else {
                response = {
                    status: 400,
                    message: "Incorrect password"
                }
            }
        } else {
            response = { 
                status: 404,
                message: 'User not found'
            }
        }

        return response;
    }
}

export default Mutation;
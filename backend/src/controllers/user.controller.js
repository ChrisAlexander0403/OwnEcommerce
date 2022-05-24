import User from "../models/user";
import bcrypt from 'bcrypt';

// import transporter from "../utils/mailer";
import { decryptData, encrypt, encryptData, generateKeys } from "../utils/encryption";
import { generateAccessToken, generateRefreshToken } from "../utils/authentication";
// import jwt from "jsonwebtoken";
// import forgotPasswordLayout from "../mails/forgotPassword.layout";
// import transporter from "../utils/mailer";

export const userRegister = async (_, { firstname, lastname, email, password, phone, birthdate }) => {
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
}

export const login = async (_, { email, password }) => {
    let response = {};
    email = email.toLowerCase();

    const user = await User.findOne({ email: email });
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            await User.updateOne({ email: email }, { $push: { tokens: refreshToken } });

            response = {
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

export const currentUser = async (_, args, { verifiedUser }) => {
    if (!verifiedUser) return { status: 401, message: "Unauthorized" }
    try{
        const user = await User.findOne({ email: verifiedUser }).exec();
        if (user) {
            return {
                status: 200,
                message: "User found successfully",
                currentUser: user
            };
        } else {
            return {
                status: 404,
                message: "User not found"
            };
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
}
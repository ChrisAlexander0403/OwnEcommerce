import User from "../models/user";
import bcrypt from 'bcrypt';

import { decryptAppData, encryptAppData, } from "../utils/encryption";

export const userRegister = async (_, { firstname, lastname, email, password, rol }) => {
    email = email.toLowerCase();
    
    const user = await User.findOne({ email });

    if (user) {
        return {
            status: 409,
            message: "User already exists"
        };
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    try {
        const newUser = new User({
            firstname: encryptAppData(firstname),
            lastname: encryptAppData(lastname),
            email,
            password: encryptedPassword,
            rol
        });
        await newUser.save();
        return {
            status: 201,
            message: "User created succesfully"
        };
    } catch {
        return {
            status: 500,
            message: "Something went wrong, try again later"
        }
    }
}

export const currentUser = async (_, args, { email }) => {
    if (!email) return { status: 401, message: "Unauthorized" }
    try{
        const user = await User.findOne({ email }).exec();
        if (user) {
            return {
                status: 200,
                message: "User found successfully",
                currentUser: {
                    firstname: decryptAppData(user.firstname),
                    lastname: decryptAppData(user.lastname),
                    email: user.email,
                    rol: user.rol,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
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

export const getUser = async (_, args, ctx) => {
    try {
        const user = User.findById(args._id);

        return {
            status: 200,
            message: "User found successfully",
            user: {
                firstname: decryptAppData(user.firstname),
                lastname: decryptAppData(user.lastname),
                email: user.email,
                rol: user.rol,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
    } catch {

    }
}

export const getAllUsers = async (_, args, ctx) => {
    try {
        let decryptedUsers = {};
        const users = await User.find();
        for (let i = 0; i < users.length; i++) {
            decryptedUsers.push({
                firstname: decryptAppData(users[i].firstname),
                lastname: decryptAppData(users[i].lastname),
                email: users[i].email,
                rol: users[i].rol,
                createdAt: users[i].createdAt,
                updatedAt: users[i].updatedAt
            });
        }

        return {
            status: 200,
            message: "Users found successfully",
            users: decryptedUsers
        }
    } catch {

    }
}
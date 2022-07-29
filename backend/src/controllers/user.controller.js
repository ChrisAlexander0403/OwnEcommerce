import User from "../models/user";
import bcrypt from 'bcrypt';

import { decryptAppData, encryptAppData, } from "../utils/encryption";

export const userRegister = async (_, { firstname, lastname, email, password, phone, rol }) => {
    email = email.toLowerCase();4

    console.log("made it")
    
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
            phone: encryptAppData(phone),
            status: "ACTIVE",
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

export const getUser = async (_, { _id }, ctx) => {
    try {
        const user = await User.findOne({ _id });

        if (user) {
            return {
                status: 200,
                message: "User found successfully",
                user: {
                    _id: user._id,
                    firstname: decryptAppData(user.firstname),
                    lastname: decryptAppData(user.lastname),
                    email: user.email,
                    phone: decryptAppData(user.phone),
                    rol: user.rol,
                    profilePicture: user.profilePicture,
                    status: user.status,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }
        }

        return {
            status: 404,
            message: "User not found"
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (_, args, ctx) => {
    try {
        let decryptedUsers = [];
        const users = await User.find({ status: { $ne: 'DELETED' } });
        for (let i = 0; i < users.length; i++) {
            decryptedUsers.push({
                _id: users[i]._id,
                firstname: decryptAppData(users[i].firstname),
                lastname: decryptAppData(users[i].lastname),
                email: users[i].email,
                phone: decryptAppData(users[i].phone),
                rol: users[i].rol,
                status: users[i].status,
                createdAt: users[i].createdAt,
                updatedAt: users[i].updatedAt
            });
        }

        return {
            
            status: 200,
            message: "Users found successfully",
            users: decryptedUsers
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (_, { _id }, ctx) => {
    try {
        await User.findOneAndUpdate({ _id }, {
            $set: {
                status: "DELETED"
            }
        });

        return {
            status: 200,
            message: "User deleted successfully"
        }
        
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Something went wrong, try again later"
        }
    }
}
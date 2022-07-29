import Client from "../models/client";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { decryptAppData, encryptAppData, generateKeys } from "../utils/encryption";
import forgotPasswordLayout from "../mails/forgotPassword.layout";
import confirmAccountLayout from "../mails/confirmAccount.layout";
import transporter from "../config/mailer";
import { generateToken, getTokenData } from "../utils/authentication";
import isPasswordInUse from "../helpers/isPasswordInUse";

export const clientRegister = async (_, { firstname, lastname, email, password, phone, birthdate }, ctx) => {
    email = email.toLowerCase();
    
    const client = await Client.findOne({ email: email });
    if (client) {
        return {
            status: 409,
            message: "Client already exists"
        };
    }
    else {
        const publicKey = generateKeys(email);
        const encryptedPassword = await bcrypt.hash(password, 12);
        const code = uuidv4();

        try {
            const newClient = new Client({
                firstname: encryptAppData(firstname),
                lastname: encryptAppData(lastname),
                email: email,
                password: encryptedPassword,
                phone: encryptAppData(phone),
                birthdate: encryptAppData(birthdate),
                publicKey: publicKey,
                verificationCode: code
            });
            const token = generateToken({ email, code });
            await transporter.sendMail({
                from: '"Fred Foo" <foo@example.com>',
                to: email,
                subject: 'Verificación de cuenta',
                text: 'Verificación de cuenta',
                html: confirmAccountLayout(firstname, token)
            });
            await newClient.save();
            return {
                status: 201,
                message: "Client created succesfully"
            };
        } catch (err){
            console.log(err)
            return {
                status: 500,
                message: "Something went wrong, try again later"
            }
        }
    }
}

export const confirmClientAccount = async (_, { token }, ctx) => {
    if(!token) {
        return {
            status: 400,
            message: "Bad request"
        }
    }
    try {
        const data = await getTokenData(token);
        const { email, code } = data.data;
        
        if(!email) {
            return {
                status: 403,
                message: "Forbidden"
            }
        }

        const client = await Client.findOne({ email });

        if (!client) {
            return {
                status: 404,
                message: "User not found"
            }
        }

        if (code === client.verificationCode) {
            client.status = "ACTIVE";
            await client.save();

            return {
                status: 200,
                message: "Client Verified"
            }
        }
        
        return {
            status: 403,
            message: "Forbidden"
        }
        

    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const clientForgotPassword = async (_, { email }, ctx) => {
    try {
        const client = await Client.findOne({ email: email });
        if (!client) return {
            status: 404,
            message: "Client does not exist"
        }

        const code = uuidv4();
        const encryptedCode = await bcrypt.hash(code, 12);
        client.passwordResetCode = encryptedCode;

        await client.save();

        const token = generateToken({ email, code }, '24h');

        await transporter.sendMail({
            from: '"OwnEcommerce" <chrisalexvazquez0211@gmail.com>',
            to: email,
            subject: "Recuperar contraseña",
            text: "Recuperar contraseña",
            html: forgotPasswordLayout(decryptAppData(client.firstname), token)
        });

        return {
            status: 200,
            message: "Email sent"
        }
    } catch (err) {
        console.log(err)
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const clientResetPassword = async (_, { token, newPassword }, ctx) => {
    if(!token) {
        return {
            status: 400,
            message: "Bad request"
        }
    }
    try {
        const data = await getTokenData(token);
        const { email, code } = data.data;
        
        if(!email) {
            return {
                status: 403,
                message: "Forbidden"
            }
        }

        const client = await Client.findOne({ email });

        if (!client) {
            return {
                status: 404,
                message: "Client not found"
            }
        }

        if (await bcrypt.compare(code, client.passwordResetCode)) {
            let usedPasswords = [];
            let usedBefore = false;
            usedPasswords = [...client.usedPasswords];
            
            for(let i = 0; i < usedPasswords.length; i++){
                if (await bcrypt.compare(newPassword, usedPasswords[i])) {
                    usedBefore = true;
                }
            }

            if (usedBefore || await bcrypt.compare(newPassword, client.password)) {
                return {
                    status: 400,
                    message: "Password already used"
                }
            }

            await Client.findOneAndUpdate({ email }, {
                $push: {
                    usedPasswords: client.password
                },
                $set: {
                    password: await bcrypt.hash(newPassword, 12),
                    passwordResetCode: ''
                }
            });

            return {
                status: 200,
                message: "Password reset"
            }
        }
        
        return {
            status: 403,
            message: "Forbidden"
        }
        

    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const clientChangePassword = async (_, { password, newPassword }, { email }) => {
    try {
        const client = await Client.findOne({ email });
        if (await bcrypt.compare(password, client.password)) {
            if (!await isPasswordInUse(client, newPassword)) {
                await Client.findOneAndUpdate({ email }, {
                    $push: {
                        usedPasswords: client.password
                    },
                    $set: {
                        password: await bcrypt.hash(newPassword, 12),
                    }
                });

                return {
                    status: 200,
                    message: "Password changed successfully"
                }
            }

            return {
                status: 400,
                message: "Password already used"
            }
        }

        return {
            status: 400,
            message: "Incorrect password, try again"
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const clientUpdateInfo = async (_, args, { email, clientKey }) => {
    console.log(args);
    try {
        const client = await Client.findOne({ email });
        if(!client) {
            return {
                status: 404,
                message: "Not found"
            }
        }

        if (!Object.keys(args).length > 0) {
            return {
                status: 400,
                message: "At least 1 parameter needed"
            }
        }

        if (args.firstname) client.firstname = encryptAppData(args.firstname);
        if (args.lastname) client.lastname = encryptAppData(args.lastname);
        if (args.phone) client.phone = encryptAppData(args.phone);
        if (args.birthdate) client.birthdate = encryptAppData(args.birthdate);

        await client.save();

        return {
            status: 200,
            message: "Client updated",
            updatedClient: {
                _id: client._id,
                firstname: decryptAppData(email),
                lastname: decryptAppData(email),
                email: email,
                phone: decryptAppData(email),
                birthdate: decryptAppData(email),
                createdAt: client.createdAt,
                updatedAt: client.updatedAt
            }
        }

    } catch(e) {
        console.log(e)
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const currentClient = async (_, args, { email }) => {
    try{
        const client = await Client.findOne({ email });
        if (client) {
            return {
                status: 200,
                message: "Client found successfully",
                currentClient: {
                    _id: client._id,
                    firstname: decryptAppData(email),
                    lastname: decryptAppData(email),
                    email: client.email,
                    phone: decryptAppData(email),
                    birthdate: decryptAppData(email),
                    createdAt: client.createdAt,
                    updatedAt: client.updatedAt
                }
            };
        }
        return {
            status: 404,
            message: "Client not found"
        }
    } catch(e) {
        console.log(e)
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
}

export const getClients = async (_, args, ctx) => {
    try {
        let decryptedClients = [];
        const clients = await Client.find();
        for (let i = 0; i < clients.length; i++) {
            decryptedClients.push({
                _id: clients[i]._id,
                firstname: decryptAppData(clients[i].firstname),
                lastname: decryptAppData(clients[i].lastname),
                email: clients[i].email,
                phone: decryptAppData(clients[i].phone),
                birthdate: decryptAppData(clients[i].birthdate),
                profilePicture: clients[i].profilePicture,
                status: clients[i].status,
                isSubscribed: clients[i].isSubscribed,
                createdAt: clients[i].createdAt,
                updatedAt: clients[i].updatedAt
            });
        }

        return {
            status: 200,
            message: "Customers found successfully",
            clients: decryptedClients
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}
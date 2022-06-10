import Client from "../models/client";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { decryptData, encryptData, generateKeys } from "../utils/encryption";
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
        const encryptedCode = await bcrypt.hash(code, 12);

        try {
            const newClient = new Client({
                firstname: encryptData(publicKey, firstname),
                lastname: encryptData(publicKey, lastname),
                email: email,
                password: encryptedPassword,
                phone: encryptData(publicKey, phone),
                birthdate: encryptData(publicKey, birthdate),
                publicKey: publicKey,
                verificationCode: encryptedCode
            });
            const token = generateToken({ email, code });
            await transporter.sendMail({
                from: '"Fred Foo" <foo@example.com>',
                to: email,
                subject: 'Verificación de cuenta',
                text: 'Verificación de cuenta',
                html: confirmAccountLayout(firstname)
            });
            console.log(token);
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

        if (await bcrypt.compare(code, client.verificationCode)) {
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

        const token = generateToken({ email, code });

        await transporter.sendMail({
            from: '"OwnEcommerce" <chrisalexvazquez0211@gmail.com>',
            to: email,
            subject: "Recuperar contraseña",
            text: "Recuperar contraseña",
            html: forgotPasswordLayout(decryptData(email, client.firstname))
        });

        console.log(token);

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

        if (args.firstname) client.firstname = encryptData(clientKey, args.firstname);
        if (args.lastname) client.lastname = encryptData(clientKey, args.lastname);
        if (args.phone) client.phone = encryptData(clientKey, args.phone);
        if (args.birthdate) client.birthdate = encryptData(clientKey, args.birthdate);

        await client.save();

        return {
            status: 200,
            message: "Client updated",
            updatedClient: {
                _id: client._id,
                firstname: decryptData(email, client.firstname),
                lastname: decryptData(email, client.lastname),
                email: email,
                phone: decryptData(email, client.phone),
                birthdate: decryptData(email, client.birthdate),
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
                    firstname: decryptData(email, client.firstname),
                    lastname: decryptData(email, client.lastname),
                    email: client.email,
                    phone: decryptData(email, client.phone),
                    birthdate: decryptData(email, client.birthdate),
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
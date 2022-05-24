import Client from "../models/client";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { encrypt, encryptData, generateKeys } from "../utils/encryption";
import forgotPasswordLayout from "../mails/forgotPassword.layout";
import transporter from "../config/mailer";
import { generateToken, getTokenData } from "../utils/authentication";

export const clientRegister = async (_, { firstname, lastname, email, password, phone, birthdate }) => {
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
        const { iv, encrypted } = encrypt(publicKey);
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
                encryption: {
                    public: encrypted,
                    iv: iv
                },
                verificationCode: encryptedCode
            });
            const token = generateToken({ email, code });
            await transporter.sendMail({
                from: '"Fred Foo" <foo@example.com>',
                to: email,
                subject: 'Verificación de cuenta',
                text: 'Verificación de cuenta',
                html: forgotPasswordLayout(firstname, lastname)
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

export const confirmClientAccount = async (_, { token }) => {
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
            client.status = "VERIFIED";
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

export const clientForgotPassword = async (_, { email }) => {
    try {
        const client = await Client.findOne({ email: email });
        if (client) return {
            status: 404,
            message: "Client does not exist"
        }
        await transporter.sendMail({
            from: '"OwnEcommerce" <chrisalexvazquez0211@gmail.com>',
            to: email,
            subject: "Recuperar contraseña",
            text: "Recuperar contraseña",
            html: forgotPasswordLayout(client._id, client.firstname, client.lastname)
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

export const currentClient = async (_, args, { verifiedClient }) => {
    if (!verifiedClient) return { status: 401, message: "Unauthorized" }
    try{
        const client = await Client.findOne({ email: verifiedClient });
        if (client) {
            return {
                status: 200,
                message: "Client found successfully",
                currentClient: client
            };
        }
        return {
            status: 404,
            message: "Client not found"
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
}
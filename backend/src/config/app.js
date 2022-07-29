import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import User from '../models/user';
import { encryptAppData, generateAppKeys } from '../utils/encryption';

const configure = async () => {
    try {
        const appPublicKey = fs.existsSync(path.resolve(__dirname, `../../private/appKeys/public.pem`), 'utf8');
        const appPrivateKey = fs.existsSync(path.resolve(__dirname, `../../private/appKeys/private.pem`), 'utf8');
        if (!(appPublicKey || appPrivateKey)) {
            console.log('Generating cryptography keys...');
            let generated = generateAppKeys();
            if(generated) console.log('Keys generated');
        }

        if (await User.countDocuments().exec() === 0){
            console.log('No admin users found');
            console.log('Creating a new admin user...');

            let username, password, firstname, lastname, phone;
            const reading = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            await new Promise ((resolve) => {
                reading.question('Username for admin account: ', answer => {
                    username = answer.toLowerCase();
                    resolve();
                });
            });
            await new Promise ((resolve) => {
                reading.question('Firstname for admin account: ', answer => {
                    firstname = answer;
                    resolve();
                });
            });
            await new Promise ((resolve) => {
                reading.question('Lastname for admin account: ', answer => {
                    lastname = answer;
                    reading.close();
                    resolve();
                });
            });
            console.log('Generating password...');
            password = randomBytes(32).toString('hex');
            await User.create({
                firstname: encryptAppData(firstname),
                lastname: encryptAppData(lastname),
                email: username,
                password: await bcrypt.hash(password, 12),
                phone: encryptAppData("UNDEFINED"),
                rol: 'ADMIN',
                status: 'ACTIVE'
            });
            console.log('Admin user created');
            console.log('Your password is: ', password);
        }
    } catch (e) {
        console.log(e);
    }
}

export default configure;
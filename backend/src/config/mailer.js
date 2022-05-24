import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// const transporter = nodemailer.createTransport({
//     host: process.env.host,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.user, // generated ethereal user
//         pass: process.env.pass, // generated ethereal password
//         //vhwkfuymlpxrekcl
//     },
//     tls: {rejectUnauthorized: false},
// });

let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '57e59ee8e15f14', // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
    }
});

transporter.verify((error, success) => {
    if (error) console.log(error);
    if (success) console.log(">>> Mail service is ready")
});

export default transporter;
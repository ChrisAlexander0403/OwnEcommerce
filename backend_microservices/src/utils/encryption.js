import { createCipheriv, createDecipheriv, generateKeyPairSync, randomBytes, publicEncrypt, constants, privateDecrypt, pbkdf2, createHmac } from 'crypto';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

export const encrypt = (data) => {
    let iv = randomBytes(16);
    let cipher = createCipheriv('aes-256-cbc', process.env.SECRET_KEY, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv, encrypted };
}

export const decrypt = (encrypted, iv) => {
    let decipher = createDecipheriv('aes-256-cbc', process.env.SECRET_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    return decrypted += decrypted.final('utf8');
}

export const generatePasswordBasedKey = async (password) => {
    const derivedKey = await promisify(pbkdf2)(password, process.env.SALT, 100000, 128, 'sha512');
    const hash = derivedKey.toString('hex');
    return hash.toString('hex');
    // const key;
    // pbkdf2(password, process.env.SALT, 100000, 128, 'sha512', (err, derivedKey) => {
    //     if (err) callback(err);
    //     key = derivedKey;
    // });
    // return key;
}

export const generateKeys = (id) => {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: process.env.PASSPHRASE
        }
    });

    if (!fs.existsSync(path.resolve(__dirname, '../../private/keys'))) {
        fs.mkdirSync(path.resolve(__dirname, '../../private/keys'), { recursive: true });
    }

    fs.writeFileSync(path.resolve(__dirname, `../../private/keys/${id}.pem`), privateKey, 'utf8');

    return publicKey;
}

export const encryptData = (key, data) => {
    return publicEncrypt({
        key: key,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
        Buffer.from(data)
    ).toString("base64");
}

export const decryptData = (id, data) => {
    let privateKey = fs.readFileSync(path.resolve(__dirname, `../../private/keys/${id}.pem`), 'utf8');

    const decrypted = privateDecrypt({
        key: privateKey,
        passphrase: process.env.PASSPHRASE,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
        Buffer.from(data, "base64")
    ).toString('utf8');

    return decrypted;
}
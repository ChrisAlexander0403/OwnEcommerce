import { createCipheriv, createDecipheriv, generateKeyPairSync, randomBytes, publicEncrypt, constants, privateDecrypt, pbkdf2 } from 'crypto';
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
    let salt = randomBytes(128);
    let derivedKey = await promisify(pbkdf2)(password, salt, 10000, 32, 'sha256');

    let iv = randomBytes(16);

    // encrypt the Text
    let cipher = createCipheriv("aes-256-gcm", derivedKey, iv);
    let encrypted = cipher.update(exampleString, "utf8", "base64");
    encrypted += cipher.final("base64");
    let authTag = cipher.getAuthTag();

    // decrypt the Text
    let decipher = createDecipheriv("aes-256-gcm", derivedKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
}

export const generateAppKeys = () => {
    try {
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
                passphrase: process.env.APP_PASSPHRASE
            }
        });

        if (!fs.existsSync(path.resolve(__dirname, '../../private/appKeys'))) {
            fs.mkdirSync(path.resolve(__dirname, '../../private/appKeys'), { recursive: true });
        }

        fs.writeFileSync(path.resolve(__dirname, '../../private/appKeys/public.pem'), publicKey, 'utf8');
        fs.writeFileSync(path.resolve(__dirname, '../../private/appKeys/private.pem'), privateKey, 'utf8');

        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

export const encryptAppData = (data) => {
    const key = fs.readFileSync(path.resolve(__dirname, `../../private/appKeys/public.pem`), 'utf8');
    return publicEncrypt({
        key,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, Buffer.from(data)).toString("base64");
}

export const decryptAppData = (data) => {
    const key = fs.readFileSync(path.resolve(__dirname, `../../private/appKeys/private.pem`), 'utf8');
    return privateDecrypt({
        key,
        passphrase: process.env.APP_PASSPHRASE,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
        Buffer.from(data, "base64")
    ).toString('utf8');
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
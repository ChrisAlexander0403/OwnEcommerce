import path from 'path';
import fs from 'fs';
import { randomBytes } from 'crypto';

export const imageUploader = async (images, folder) => {
    let urls = [];
    await images.forEach(async image => {
        const { createReadStream, filename } = await image;
        
        const { ext } = path.parse(filename);
        const randomName = randomBytes(16).toString("hex") + ext;

        const stream = createReadStream();
        const pathname = path.join(__dirname, `../../public/assets/img/${folder}/${randomName}`);
        urls.push(`assets/img/${folder}/${randomName}`);
        
        await stream.pipe(fs.createWriteStream(pathname));
    });

    return urls;
}
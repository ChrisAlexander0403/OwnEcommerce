import dotenv from 'dotenv';

import Connect from './config/database';
import redisClient from './config/redis';
import transporter from './config/mailer';
import app from './server';
import configure from './config/app';

dotenv.config();

(async () => {
    console.clear();
    try {
        if (await transporter.verify()) console.log('>>> Mail service is ready');
        await Connect(); 
        await redisClient.connect((error) => {
            if(error) console.log(error);
            else console.log('>>> Redis client is connected');
        });
        await app.listen(app.get('port'), () => {
            console.log('>>> Server running on port', app.get('port'));
        });
        await configure();
    } catch(e) {

    }
})();
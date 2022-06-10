import dotenv from 'dotenv';

import Connect from './config/database';
import redisClient from './config/redis';
import transporter from './config/mailer';
import app from './server';

dotenv.config();

Connect();

transporter.verify((error, success) => {
    if (error) console.log(error);
    if (success) console.log(">>> Mail service is ready")
});

redisClient.connect((error) => {
    if (error) console.log(error);
    else console.log('>>> Redis is ready');
})

app.listen(app.get('port'), () => {
    console.log('>>> Server on port', app.get('port'));
});
import dotenv from 'dotenv';

import Connect from './config/database';
import app from './server';

dotenv.config();

Connect();


app.listen(app.get('port'), () => {
    console.log('>>> Server on port', app.get('port'));
});
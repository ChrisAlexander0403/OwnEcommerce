import dotenv from 'dotenv';

import Connect from './database';

dotenv.config();

Connect();

import app from './server';

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
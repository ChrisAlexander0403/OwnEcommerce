import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connect = async () => {

    const host = process.env.DATABASE_HOST || 'localhost';
    const name = process.env.DATABASE_NAME || 'ownecommerce';

    try{
        await mongoose.connect(`mongodb://${host}/${name}`);
        console.log('>>> DB is connected');
    }catch(e){
        console.log("Couldn't connect to Database");
        console.log(e);
    }
}

export default Connect;
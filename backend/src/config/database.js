import mongoose from 'mongoose';

const Connect = async () => {
    try{
        await mongoose.connect("mongodb://localhost/ownecommerce");
        console.log('>>> DB is connected');
    }catch(e){
        console.log("Couldn't connect to Database");
        console.log(e);
    }
}

export default Connect;
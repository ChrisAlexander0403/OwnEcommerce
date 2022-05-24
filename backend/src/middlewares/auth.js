import jwt from "jsonwebtoken";
import Client from "../models/client";
import User from "../models/user";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (await User.findOne({ email })) req.verifiedUser = email;
            if (await Client.findOne({ email })) req.verifiedClient = email;
        } catch(e) {
            console.log(e);
        }
    }
    next();
}

export default authenticate;
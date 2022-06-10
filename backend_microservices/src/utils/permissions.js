import { rule } from 'graphql-shield';
import jwt from "jsonwebtoken";

import Client from "../models/client";

export const clientLogged = rule()(async (_, args, ctx, info) => {
    const authHeader = ctx.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // if (await User.findOne({ email })) ctx.verifiedUser = email;
            const client = await Client.findOne({ email });
            if (client) {
                ctx.clientId = client._id;
                ctx.email = email;
                ctx.clientKey = client.publicKey;
            }
            else return new Error("Forbidden");
        } catch {
            return new Error("Unauthorized");
        }
    } else {
        return new Error("Unauthorized");
    }
    return true;
});
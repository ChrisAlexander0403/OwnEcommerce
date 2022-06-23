import { rule } from 'graphql-shield';
import jwt from "jsonwebtoken";

import Client from "../models/client";
import User from "../models/user";

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

export const userLogged = rule()(async (_, args, ctx, info) => {
    const authHeader = ctx.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // if (await User.findOne({ email })) ctx.verifiedUser = email;
            const user = await User.findOne({ email });
            if (user) {
                ctx.userId = user._id;
                ctx.email = email;
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
//password: 70047a05d2f102fabefedd731fd0cdb3c20b3d5e974e2ce542fc19617c4ea2da

export const isAdmin = rule()(async (_, args, ctx, info) => {
    const authHeader = ctx.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const { rol } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (rol === 'ADMIN') return true;
        } catch {
            return new Error("Forbidden");
        }
    }
    return new Error("Unauthorized");
});

export const isSeller = rule()(async (_, args, ctx, info) => {
    const authHeader = ctx.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const { rol } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (rol === 'SELLER') return true;
        } catch {
            return new Error("Forbidden");
        }
    }
    return new Error("Unauthorized");
});

export const isPublicist = rule()(async (_, args, ctx, info) => {
    const authHeader = ctx.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const { rol } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (rol === 'PUBLICIST') return true;
        } catch {
            return new Error("Forbidden");
        }
    }
    return new Error("Unauthorized");
});
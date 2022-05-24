import express from 'express';
import { graphqlHTTP } from "express-graphql";
// import fileUpload from 'express-fileupload';
import cors from 'cors';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';
// import jwt from 'jsonwebtoken';

import resolvers from './graphql/resolvers';
import authenticate from './middlewares/auth';

const schema = loadSchemaSync(join(__dirname, 'graphql/schema.graphql'), {
    loaders: [new GraphQLFileLoader()]
});

const app = express();

//settings
app.set('port', process.env.PORT || 5000)

//middlewares
app.use(cors());
app.use(express.json());
// app.use(fileUpload());
app.use(express.static('public'));
// app.use((req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (authHeader) {
//         const token = authHeader.split(' ')[1]
//         try {
//             const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//             req.user = _id;
//         } catch {

//         }
//     }
//     next();
// })
app.use(authenticate);
app.use('/graphql', graphqlHTTP({
    schema: addResolversToSchema({
        schema,
        resolvers
    }),
    graphiql: true
}));

export default app;
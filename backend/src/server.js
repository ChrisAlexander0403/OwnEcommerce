import express from 'express';
import { graphqlHTTP } from "express-graphql";
// import fileUpload from 'express-fileupload';
import cors from 'cors';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';

import resolvers from './graphql/resolvers';

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
app.use('/graphql', graphqlHTTP({
    schema: addResolversToSchema({
        schema,
        resolvers
    }),
    graphiql: true
}));

export default app;
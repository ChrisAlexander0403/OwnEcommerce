import Query from './Query';
import Mutation from './Mutation';
import DateScalar from './DateScalar';
import IClientResponse from './responses/IClientResponse';
import IProductResponse from './responses/IProductResponse';
import IUserResponse from './responses/IUserResponse';
import ISessionResponse from './responses/ISessionResponse';
import IShippingAddressResponse from './responses/IShippingAddressResponse';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

export default {
    Query,
    Mutation,
    DateScalar,
    Upload: GraphQLUpload,
    IClientResponse,
    IProductResponse,
    IUserResponse,
    ISessionResponse,
    IShippingAddressResponse
}
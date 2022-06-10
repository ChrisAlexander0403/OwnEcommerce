import { shield } from 'graphql-shield';
// import { clientLogged } from '../utils/permissions';

const permissions = shield({
    // Query: {
    //     currentClient: clientLogged,
    //     getClientShippingAddresses: clientLogged,
    //     getClientShippingAddress: clientLogged
    // },
    // Mutation: {
    //     clientChangePassword: clientLogged,
    //     clientUpdateInfo: clientLogged,
    //     addShippingAddress: clientLogged,
    //     updateClientShippingAddress: clientLogged,
    //     deleteClientShippingAddress: clientLogged
    // }
});

export default permissions;
import { and, shield } from 'graphql-shield';
import { clientLogged, isAdmin, userLogged } from '../utils/permissions';

const permissions = shield({
    Query: {
        currentClient: clientLogged,
        getClientShippingAddresses: clientLogged,
        getClientShippingAddress: clientLogged,

        currentUser: userLogged,
    },
    Mutation: {
        clientChangePassword: clientLogged,
        clientUpdateInfo: clientLogged,
        addShippingAddress: clientLogged,
        updateClientShippingAddress: clientLogged,
        deleteClientShippingAddress: clientLogged,
        
        userRegister: and(userLogged, isAdmin),

        createAccessory: and(userLogged, isAdmin),
        editAccessory: and(userLogged, isAdmin),
        deleteAccessory: and(userLogged, isAdmin)
    }
});

export default permissions;
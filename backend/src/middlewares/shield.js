import { allow, and, shield } from 'graphql-shield';
import { login } from '../controllers/session.controller';
import { clientLogged, isAdmin, userLogged } from '../utils/permissions';

const permissions = shield({
    Query: {
        currentClient: clientLogged,
        getClientShippingAddresses: clientLogged,
        getClientShippingAddress: clientLogged,

        currentUser: userLogged,
    },
    Mutation: {
        login: allow,
        clientChangePassword: clientLogged,
        clientUpdateInfo: clientLogged,
        addShippingAddress: clientLogged,
        updateClientShippingAddress: clientLogged,
        deleteClientShippingAddress: clientLogged,
        
        // userRegister: and(userLogged, isAdmin),

        // createPhone: and(userLogged, isAdmin),
        // createAccessory: and(userLogged, isAdmin),
        editAccessory: and(userLogged, isAdmin),
        deleteAccessory: and(userLogged, isAdmin)
    }
}, {
    debug: true
});

export default permissions;
import { clientChangePassword, clientForgotPassword, clientRegister, clientResetPassword, clientUpdateInfo, confirmClientAccount } from "../../controllers/client.controller";
import { createAccessory, deleteAccessory, editAccessory } from "../../controllers/product.controller";
import { login, refreshClientSession, refreshUserSession } from "../../controllers/session.controller";
import { addShippingAddress, updateClientShippingAddress, deleteClientShippingAddress } from "../../controllers/shippingAddress.controller";
import { userRegister } from "../../controllers/user.controller";

const Mutation = {
    //Session Controller
    refreshUserSession: refreshUserSession,
    refreshClientSession: refreshClientSession,
    login: login,

    //User Controller
    userRegister: userRegister,
    //userForgotPassword: userForgotPassword,
    
    //Client Controller
    clientRegister: clientRegister,
    confirmClientAccount: confirmClientAccount,
    clientForgotPassword: clientForgotPassword,
    clientResetPassword: clientResetPassword,
    clientChangePassword: clientChangePassword,
    clientUpdateInfo: clientUpdateInfo,
    addShippingAddress: addShippingAddress,
    updateClientShippingAddress: updateClientShippingAddress,
    deleteClientShippingAddress: deleteClientShippingAddress,

    //Product Controller
    createAccessory: createAccessory,
    editAccessory: editAccessory,
    deleteAccessory: deleteAccessory
}

export default Mutation;
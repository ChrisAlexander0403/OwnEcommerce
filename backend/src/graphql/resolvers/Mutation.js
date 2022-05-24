import { clientForgotPassword, clientRegister, confirmClientAccount } from "../../controllers/client.controller";
import { login, refreshClientSession, refreshUserSession } from "../../controllers/session.controller";
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
    // clientForgotPassword: clientForgotPassword,
}

export default Mutation;
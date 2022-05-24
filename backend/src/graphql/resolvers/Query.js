import { currentClient } from "../../controllers/client.controller";
import { currentUser } from "../../controllers/user.controller";


const Query = {
    hello: () => 'Hello world!',
    //User Controller
    currentUser: currentUser,

    //Client Controller
    currentClient: currentClient
}

export default Query;
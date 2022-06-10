import { currentClient } from "../../controllers/client.controller";
import { getClientShippingAddress, getClientShippingAddresses } from "../../controllers/shippingAddress.controller";
import { currentUser } from "../../controllers/user.controller";


const Query = {
    hello: () => 'Hello world!',
    //User Controller
    currentUser: currentUser,

    //Client Controller
    currentClient: currentClient,
    getClientShippingAddresses: getClientShippingAddresses,
    getClientShippingAddress: getClientShippingAddress
}

export default Query;
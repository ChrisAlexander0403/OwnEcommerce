import { currentClient } from "../../controllers/client.controller";
import { getAccessory, getAllAccessories } from "../../controllers/product.controller";
import { getClientShippingAddress, getClientShippingAddresses } from "../../controllers/shippingAddress.controller";
import { currentUser } from "../../controllers/user.controller";


const Query = {
    hello: () => 'Hello world!',
    //User Controller
    currentUser: currentUser,

    //Client Controller
    currentClient: currentClient,
    getClientShippingAddresses: getClientShippingAddresses,
    getClientShippingAddress: getClientShippingAddress,

    //Product Controller
    getAllAccessories: getAllAccessories,
    getAccessory: getAccessory,
}

export default Query;
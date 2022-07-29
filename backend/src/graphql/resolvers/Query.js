import { currentClient, getClients } from "../../controllers/client.controller";
import { getAccessory, getAccessories, getPhones, getPhone } from "../../controllers/product.controller";
import { getClientShippingAddress, getClientShippingAddresses } from "../../controllers/shippingAddress.controller";
import { currentUser, getUser, getUsers } from "../../controllers/user.controller";


const Query = {
    hello: () => 'Hello world!',
    //User Controller
    currentUser: currentUser,
    getUsers: getUsers,
    getUser: getUser,

    //Client Controller
    currentClient: currentClient,
    getClients: getClients,
    getClientShippingAddresses: getClientShippingAddresses,
    getClientShippingAddress: getClientShippingAddress,

    //Product Controller
    getPhones: getPhones,
    getPhone: getPhone,
    getAccessories: getAccessories,
    getAccessory: getAccessory,
}

export default Query;
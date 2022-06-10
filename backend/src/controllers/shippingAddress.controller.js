import ShippingAddress from "../models/shippingAddress";
import { Types } from "mongoose";
import { decryptData, encryptData } from "../utils/encryption";

export const addShippingAddress = async (_, args, { clientId, clientKey }) => {
    try {
        const newShippingAddress = new ShippingAddress({
            name: encryptData(clientKey, args.name),
            street: encryptData(clientKey, args.street),
            number: encryptData(clientKey, args.number),
            neighborhood: encryptData(clientKey, args.neighborhood),
            city: encryptData(clientKey, args.city),
            state: encryptData(clientKey, args.state),
            country: encryptData(clientKey, args.country),
            zipCode: encryptData(clientKey, args.zipCode),
            client: Types.ObjectId(clientId)
        });

        await newShippingAddress.save();
        
        return {
            status: 201,
            message: "Added new shipping address"
        }

    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getClientShippingAddresses = async (_, args, { clientId, email }) => {
    try {
        const shippingAddresses = await ShippingAddress.find({ client: clientId });
        const decryptedShippingAddresses = [];

        if (!shippingAddresses) {
            return {
                status: 404,
                message: "There is not shipping addresses yet"
            }
        }

        for (let i = 0; i < shippingAddresses.length; i++) {
            if (shippingAddresses[i].status !== '0') {
                decryptedShippingAddresses.push({
                    _id: shippingAddresses[i]._id,
                    name: decryptData(email, shippingAddresses[i].name),
                    street: decryptData(email, shippingAddresses[i].street),
                    number: decryptData(email, shippingAddresses[i].number),
                    neighborhood: decryptData(email, shippingAddresses[i].neighborhood),
                    city: decryptData(email, shippingAddresses[i].city),
                    state: decryptData(email, shippingAddresses[i].state),
                    country: decryptData(email, shippingAddresses[i].country),
                    zipCode: decryptData(email, shippingAddresses[i].zipCode),
                    location: shippingAddresses[i].location,
                    createdAt: shippingAddresses[i].createdAt,
                    updatedAt: shippingAddresses[i].updatedAt,
                });
            }
        }

        return {
            status: 200,
            message: "Addresses found",
            shippingAddresses: decryptedShippingAddresses
        }
    } catch(e) {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getClientShippingAddress = async (_, { _id }, { email }) => {
    try {
        const shippingAddress = await ShippingAddress.findOne({ _id });
        
        if (!shippingAddress) {
            return {
                status: 404,
                message: "Shipping address not found"
            }
        }

        return {
            status: 200,
            message: "Shipping address found",
            shippingAddress: {
                _id: shippingAddress._id,
                name: decryptData(email, shippingAddress.name),
                street: decryptData(email, shippingAddress.street),
                number: decryptData(email, shippingAddress.number),
                neighborhood: decryptData(email, shippingAddress.neighborhood),
                city: decryptData(email, shippingAddress.city),
                state: decryptData(email, shippingAddress.state),
                country: decryptData(email, shippingAddress.country),
                zipCode: decryptData(email, shippingAddress.zipCode)
            }
        }

    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const updateClientShippingAddress = async (_, args, { clientKey }) => {
    try {
        const shippingAddress = await ShippingAddress.findOne({ _id: args._id });

        if (!shippingAddress) {
            return {
                status: 404,
                message: "Shipping address not found"
            }
        }

        if (args.name) shippingAddress.name = encryptData(clientKey, args.name);
        if (args.street) shippingAddress.street = encryptData(clientKey, args.street);
        if (args.number) shippingAddress.number = encryptData(clientKey, args.number);
        if (args.neighborhood) shippingAddress.neighborhood = encryptData(clientKey, args.neighborhood);
        if (args.city) shippingAddress.city = encryptData(clientKey, args.city);
        if (args.state) shippingAddress.state = encryptData(clientKey, args.state);
        if (args.country) shippingAddress.country = encryptData(clientKey, args.country);
        if (args.zipCode) shippingAddress.zipCode = encryptData(clientKey, args.zipCode);

        await shippingAddress.save();

        return {
            status: 200,
            message: "Shipping address updated successfully"
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const deleteClientShippingAddress = async (_, { _id }, ctx) => {
    try {
        await ShippingAddress.findByIdAndUpdate({ _id }, {
            $set: {
                status: "0"
            }
        });

        return {
            status: 200,
            message: "Shipping address deleted successfully"
        }

    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}
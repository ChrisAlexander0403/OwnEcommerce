import Accessory from '../models/accessory';
import Phone from '../models/phone';
import { imageUploader } from '../utils/fileUploader';

export const createPhone = async (_, args, ctx) => {
    const { sku, model, name, brand, color, display, memory, storage, connectivity, 
        battery, SO, dimensions, cameras, fingerprint, description, price, discount, 
        inStock, images } = args;
    try{
        const urls = await imageUploader(images, 'phones');
        
        const newPhone = new Phone({ sku, model, name, brand, color, display, memory, 
            storage, connectivity, battery, SO, dimensions, cameras, fingerprint, 
            description, price, discount: discount ? discount : 0, 
            inStock: inStock ? inStock : 0, images: urls });
            
        await newPhone.save();

        return {
            status: 201,
            message: "Phone created successfully"
        }
    } catch(error) {
        console.log(error)
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getPhones = async (_, args, ctx) => {
    try {
        const phones = await Phone.find({ status: { $ne: 'DELETED' } });
        return {
            status: 200,
            message: "Customers found successfully",
            phones: phones
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getPhone = async (_, { _id }, ctx) => {
    try {
        const phone = await Phone.findOne({ _id });
        if (phone.status === "DELETED") {
            return {
                status: 404,
                message: "Phone does not exist"
            }
        }
        return {
            status: 200,
            message: "Phone found successfully",
            phone
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const editPhone = async (_, args, ctx) => {

}

export const deletePhone = async (_, args, ctx) => {

}

export const createAccessory = async (_, args, ctx) => {
    const { sku, model, name, brand, color, description, price, discount, inStock, images } = args;
    try{
        const urls = await imageUploader(images, 'accessories');

        const newAccessory = new Accessory({ sku, model, name, brand, color, description, 
            price, discount, inStock, images: urls });

        await newAccessory.save();

        return {
            status: 201,
            message: "Accessory created successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getAccessories = async (_, args, ctx) => {
    try {
        const accessories = await Accessory.find({ status: { $ne: 'DELETED' } });
        return {
            status: 200,
            message: "Accessories found successfully",
            accessories
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getAccessory = async (_, args, ctx) => {
    try {
        const accessory = await Accessory.findOne({ sku: args.sku });

        if (!accessory || accessory.status === "DELETED") {
            return {
                status: 404,
                message: "Accessory not found"
            }
        }
        
        return {
            status: 200,
            message: "Accessory found successfully",
            accessory
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const editAccessory = async (_, args, ctx) => {
    try {
        const accessory = await Accessory.findOne({ sku: args.sku });
        if (args.sku) accessory.sku = args.sku;
        if (args.model) accessory.model = args.model;
        if (args.name) accessory.name = args.name;
        if (args.branch) accessory.branch = args.branch;
        if (args.color) accessory.color = args.color;
        if (args.description) accessory.description = args.description;
        if (args.price) accessory.price = args.price;
        if (args.discount) accessory.discount = args.discount;
        if (args.inStock) accessory.inStock = args.inStock;

        await accessory.save();

        return {
            status: 200,
            message: "Accessory updated successfully"
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}
export const deleteAccessory = async (_, { sku }, ctx) => {
    try {
        await Accessory.findOneAndUpdate({ sku }, {
            $set: {
                status: "DELETED"
            }
        });

        return {
            status: 200,
            message: "Accessory deleted successfully"
        }
    } catch {
        return {
            status: 500,
            message: "Something wen wrong"
        }
    }
}
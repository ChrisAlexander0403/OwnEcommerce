import Accessory from '../models/accessory';

export const createPhone = async (_, args, ctx) => {
    try {

    } catch {

    }
}

export const getPhone = async (_, args, ctx) => {

}

export const editPhone = async (_, args, ctx) => {

}

export const deletePhone = async (_, args, ctx) => {

}

export const createAccessory = async (_, args, ctx) => {
    const { sku, model, name, branch, color, description, price, discount, inStock, images } = args;
    try{
        const newAccessory = new Accessory({ sku, model, name, branch, color, description, 
            price, discount, inStock, images });
        await newAccessory.save();

        return {
            status: 201,
            message: "Accessory created successfully"
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getAllAccessories = async (_, args, ctx) => {
    try {
        const accessories = await Accessory.find();
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
export const deleteAccessory = async (_, args, ctx) => {
    try {
        await Accessory.findOneAndUpdate({ sku: args.sku }, {
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
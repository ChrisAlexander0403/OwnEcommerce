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

export const getAccessory = async (_, args, ctx) => {

}

export const editAccessory = async (_, args, ctx) => {

}
export const deleteAccessory = async (_, args, ctx) => {

}
import { v4 as uuidv4 } from 'uuid';
import Accessory from '../models/accessory';
import Order from "../models/order";
import Phone from '../models/phone';

export const createOrder = async (_, args, ctx) => {
    try {
        let itemsPrice;
        for(let i = 0; i <= args.orderItems.length; i++){
            let product = await Phone.findOne({ _id: args.orderItems[i].product });
            if (!product) {
                product = await Accessory.findOne({ _id: args.orderItems[i].product });
            }
            if (product.discount > 0) {
                itemsPrice += (product.price - (product.price * product.discount) / 100) * args.orderItems[i].qty;
            } else {
                itemsPrice += product.price * product.qty;
            }
        }
        let shippingPrice = 50;
        let taxPrice = itemsPrice * .16;
        let totalPrice = itemsPrice + taxPrice + shippingPrice;
        const newOrder = new Order({
            uuid: uuidv4(),
            orderItems: args.orderItems,
            paymentMethod: args.paymentMethod,
            itemsPrice: args.itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            customer: args.customer
        });
        await newOrder.save();
        return {
            status: 201,
            message: "Order created successfully"
        }
    } catch {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

export const getOrders = () => {

}

export const getOrder = () => {

}

export const editOrder = () => {

}

export const deleteOrder = () => {
    
}
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
        },
        increaseItemQuantity: (state, action) => {
            state.cart.find(item => item._id === action.payload).quantity += 1;
        },
        decreaseItemQuantity: (state, action) => {
            state.cart.find(item => item._id === action.payload).quantity -= 1;
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload)
        },
        deleteCart: (state) => {
            state.cart = [];
        }
    }
});

export const { addToCart, increaseItemQuantity, decreaseItemQuantity, deleteCart, removeItem } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const getItem = (action) => (state) => state.cart ? state.cart.cart.find(item => item._id === action) : null;

export default cartSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import sessionReducer from './slices/sessionSlice';
// import themeReducer from './slices/themeSlice';

const reducers = combineReducers({
    cart: cartReducer,
    user: userReducer,
    session: sessionReducer,
    // theme: themeReducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore ({
    reducer: persistedReducer
});
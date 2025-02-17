import {configureStore} from '@reduxjs/toolkit'; // to create a store, we need to import configureStore from @reduxjs/toolkit
import CartSlice from './slices/CartSlice';// importing the created slice

const Store = configureStore({
    reducer: {
        cart: CartSlice,
    },
});

export default Store;
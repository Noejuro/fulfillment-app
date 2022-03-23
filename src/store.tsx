import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import productsReducer from './features/products/productsSlice'
import warehousesReducer from './features/warehouses/warehousesSlice'
import ordersReducer from './features/orders/ordersSlice'
import storesReducer from './features/store/storesSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        warehouses: warehousesReducer,
        orders: ordersReducer,
        stores: storesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
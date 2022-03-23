import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ordersService from './ordersService';
import { AxiosError } from 'axios'

//INTERFACES
import IOrder from '../../interfaces/Order'
import INewOrder from '../../interfaces/NewOrder'

interface IInitalState {
    orders: Array<IOrder> | [],
    isError: boolean,
    isRequested: boolean,
    isCreatedSuccess: boolean,
    isCreatedError: boolean,
    message: string | unknown
}

const initialState: IInitalState = {
    orders: [],
    isError: false,
    isRequested: false,
    isCreatedSuccess: false,
    isCreatedError: false,
    message: ''
}

//Get all orders
export const getOrders = createAsyncThunk(
    'orders/all', 
    async (_, thunkAPI) => {
        try {
            return await ordersService.getOrders();
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

//Create order
export const createOrder = createAsyncThunk(
    'orders/create', 
    async (order: INewOrder, thunkAPI) => {
        try {
            return await ordersService.create(order);
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.message = '';
            state.orders = [];
            state.isRequested = false;
        },
        resetCreated: (state) => {
            state.isCreatedError = false;
            state.isCreatedSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isRequested = true;
                state.isError = false;
                state.message = '';
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isRequested = true;
                state.isError = true;
                state.message = action.payload;
                state.orders = []
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isCreatedError = false;
                state.isCreatedSuccess = true;
                state.message = '';
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isCreatedError = true;
                state.isCreatedSuccess = false;
                state.message = action.payload;
            })
    },
})

export const { reset, resetCreated } = ordersSlice.actions
export default ordersSlice.reducer;
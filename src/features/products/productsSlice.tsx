import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productsService from './productsService';
import { AxiosError } from 'axios'

//INTERFACES
import IProduct from '../../interfaces/Product'
import INewProduct from '../../interfaces/NewProduct'

interface IInitalState {
    products: Array<IProduct> | [],
    isError: boolean,
    isRequested: boolean,
    isCreatedSuccess: boolean,
    isCreatedError: boolean,
    isDeletedSuccess: boolean,
    isDeletedError: boolean,
    message: string | unknown
}

const initialState: IInitalState = {
    products: [],
    isError: false,
    isRequested: false,
    isCreatedSuccess: false,
    isCreatedError: false,
    isDeletedSuccess: false,
    isDeletedError: false,
    message: ''
}

//Get all products
export const getProducts = createAsyncThunk(
    'products/all', 
    async (_, thunkAPI) => {
        try {
            return await productsService.getProducts();
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

//Create product
export const createProduct = createAsyncThunk(
    'products/create', 
    async (product: INewProduct, thunkAPI) => {
        try {
            return await productsService.create(product);
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

//Delete product
export const deleteProduct = createAsyncThunk(
    'products/delete', 
    async (id: string, thunkAPI) => {
        try {
            return await productsService.deleteProduct(id);
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.message = '';
            state.products = [];
            state.isRequested = false;
        },
        resetCreated: (state) => {
            state.isCreatedError = false;
            state.isCreatedSuccess = false;
            state.message = '';
        },
        resetDeleted: (state) => {
            state.isDeletedError = false;
            state.isDeletedSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isRequested = true;
                state.isError = false;
                state.message = '';
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isRequested = true;
                state.isError = true;
                state.message = action.payload;
                state.products = []
            })

            .addCase(createProduct.fulfilled, (state, action) => {
                state.isCreatedError = false;
                state.isCreatedSuccess = true;
                state.message = '';
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isCreatedError = true;
                state.isCreatedSuccess = false;
                state.message = action.payload;
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isDeletedError = false;
                state.isDeletedSuccess = true;
                state.message = '';
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isDeletedError = true;
                state.isDeletedSuccess = false;
                state.message = action.payload;
            })
    },
})

export const { reset, resetCreated, resetDeleted } = productsSlice.actions
export default productsSlice.reducer;
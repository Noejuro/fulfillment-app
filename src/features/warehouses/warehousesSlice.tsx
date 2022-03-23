import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import warehousesService from './warehousesService';
import { AxiosError } from 'axios'

//INTERFACES
import IWarehouse from '../../interfaces/Warehouse'

interface IInitalState {
    warehouses: Array<IWarehouse> | [],
    isError: boolean
    message: string | unknown
}

const initialState: IInitalState = {
    warehouses: [],
    isError: false,
    message: ''
}

//Get all products
export const getWarehouses = createAsyncThunk(
    'warehouses/all', 
    async (_, thunkAPI) => {
        try {
            return await warehousesService.getWarehouses();
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

export const warehousesSlice = createSlice({
    name: 'warehouses',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.message = '';
            state.warehouses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWarehouses.fulfilled, (state, action) => {
                state.isError = false;
                state.message = '';
                state.warehouses = action.payload;
            })
            .addCase(getWarehouses.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.warehouses = []
            })
    },
})

export const { reset } = warehousesSlice.actions
export default warehousesSlice.reducer;
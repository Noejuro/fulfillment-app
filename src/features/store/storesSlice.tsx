import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import storesService from './storesService';
import { AxiosError } from 'axios'

//INTERFACES
import IStore from '../../interfaces/Store'

interface IInitalState {
    stores: Array<IStore> | [],
    isError: boolean,
    isRequested: boolean,
    message: string | unknown
}

const initialState: IInitalState = {
    stores: [],
    isError: false,
    isRequested: false,
    message: ''
}

//Get all stores
export const getStores = createAsyncThunk(
    'stores/all', 
    async (_, thunkAPI) => {
        try {
            return await storesService.getStores();
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

export const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isRequested = false;
            state.message = '';
            state.stores = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStores.fulfilled, (state, action) => {
                state.isError = false;
                state.isRequested = true;
                state.message = '';
                state.stores = action.payload;
            })
            .addCase(getStores.rejected, (state, action) => {
                state.isError = true;
                state.isRequested = true;
                state.message = action.payload;
                state.stores = []
            })
    },
})

export const { reset } = storesSlice.actions
export default storesSlice.reducer;
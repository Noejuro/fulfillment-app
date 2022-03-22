import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import authService from './authService';
import { AxiosError } from 'axios'
import IUser from '../../interfaces/User'

interface IInitalState {
    user: IUser | null,
    isError: boolean,
    isSuccess: boolean,
    message: string | unknown
}

const userJson = localStorage.getItem('user');
const user:IUser | null  = userJson !== null ? JSON.parse(userJson) : null;

const initialState: IInitalState = {
    user,
    isError: false,
    isSuccess: false,
    message: ''
}

//Register user
export const registerUser = createAsyncThunk(
    'auth/register', 
    async (user: IUser, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer;
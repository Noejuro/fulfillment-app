import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
import { AxiosError } from 'axios'

//INTERFACES
import IUser from '../../interfaces/User'

interface IInitalState {
    user: IUser | null,
    isError: boolean,
    message: string | unknown
}

interface IUserCredentials {
    email: string,
    password: string
}

const userJson = localStorage.getItem('user');
const user:IUser | null  = userJson !== null ? JSON.parse(userJson) : null;

const initialState: IInitalState = {
    user,
    isError: false,
    message: ''
}

//Login user
export const login = createAsyncThunk(
    'auth/login', 
    async (userCredentials: IUserCredentials, thunkAPI) => {
        try {
            return await authService.login(userCredentials);
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.response?.data.message);
        }
})

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

//Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout();
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.message = '';
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isError = false;
                state.message = '';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.message = '';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer;
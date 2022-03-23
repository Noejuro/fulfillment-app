import axios from 'axios'

//INTERFACES
import IUser from '../../interfaces/User'

interface IUserCredentials {
    email: string,
    password: string
}

const API_URL = '/auth/'

//Login user
const login = async(userCredentials: IUserCredentials) => {
    const response = await axios.post(API_URL + 'login', userCredentials)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Register user
const register = async(userData: IUser) => {
    const response = await axios.post(API_URL + 'signup', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout
const logout = () => { localStorage.removeItem('user') }

const authService = {
    login,
    register,
    logout
}

export default authService;
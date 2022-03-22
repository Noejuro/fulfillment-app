import axios from 'axios'
import IUser from '../../interfaces/User'

const API_URL = '/auth/signup/'

//Register user
const register = async(userData: IUser) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register
}

export default authService;
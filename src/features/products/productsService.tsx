import axios from 'axios'

// Interfaces
import IUser from '../../interfaces/User';
import INewProduct from '../../interfaces/NewProduct'

const userJson = localStorage.getItem('user');
const user:IUser | null  = userJson !== null ? JSON.parse(userJson) : null;

const token: string = user?.token !== undefined ? user.token : '';

const API_URL = '/products/'

const config = { headers: { 'x-access-token': token } }

//Get all products
const getProducts = async() => {
    const response = await axios.get(API_URL, config)

    return response.data
}

// Create product
const create = async(product: INewProduct) => {
    const response = await axios.post(API_URL + 'create', product, config)

    return response.data
}

const productsService = {
    getProducts,
    create
}

export default productsService;
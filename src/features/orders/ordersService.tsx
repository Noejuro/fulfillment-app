import axios from 'axios'
import getConfig from '../../utils/axiosConfig'

// Interfaces
import INewOrder from '../../interfaces/NewOrder'

const API_URL = '/orders/'

//Get all orders
const getOrders = async() => {
    const config = getConfig();
    const response = await axios.get(API_URL, config)

    return response.data
}

// Create orders
const create = async(order: INewOrder) => {
    const config = getConfig();
    const response = await axios.post(API_URL + 'create', order, config)

    return response.data
}

const ordersService = {
    getOrders,
    create
}

export default ordersService;
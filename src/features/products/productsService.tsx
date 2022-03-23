import axios from 'axios'
import getConfig from '../../utils/axiosConfig'

// Interfaces
import INewProduct from '../../interfaces/NewProduct'

const API_URL = '/products/'

//Get all products
const getProducts = async() => {
    const config = getConfig();
    const response = await axios.get(API_URL, config)

    return response.data
}

// Create product
const create = async(product: INewProduct) => {
    const config = getConfig();
    const response = await axios.post(API_URL + 'create', product, config)

    return response.data
}

// Delete product
const deleteProduct = async(id: string) => {
    const config = getConfig();
    const response = await axios.delete(API_URL + id, config)

    return response.data
}

const productsService = {
    getProducts,
    create,
    deleteProduct
}

export default productsService;
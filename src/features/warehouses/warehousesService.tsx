import axios from 'axios'
import getConfig from '../../utils/axiosConfig'

const API_URL = '/warehouses/'

//Get all warehouses
const getWarehouses = async() => {
    const config = getConfig();
    const response = await axios.get(API_URL, config)

    return response.data
}

const warehousesService = {
    getWarehouses
}

export default warehousesService;
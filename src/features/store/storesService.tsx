import axios from 'axios'
import getConfig from '../../utils/axiosConfig'

const API_URL = '/stores/'

//Get all stores
const getStores = async() => {
    const config = getConfig();
    const response = await axios.get(API_URL, config)

    return response.data
}

const storesService = {
    getStores
}

export default storesService;
import IConfig from '../interfaces/AxiosConfig'
import IUser from '../interfaces/User'

const getConfig = (): IConfig => {
    const userJson = localStorage.getItem('user');
    const user:IUser | null  = userJson !== null ? JSON.parse(userJson) : null;

    const token: string = user?.token !== undefined ? user.token : '';

    const config = { headers: { 'x-access-token': token } }

    return config;
}

export default getConfig;
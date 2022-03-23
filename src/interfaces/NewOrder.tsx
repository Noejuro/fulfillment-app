import IProduct from "./Product"
import IClient from "./Client"

export default interface INewOrder {
    products: Array<IProduct>,
    warehouse: string,
    store: string,
    client: IClient,
}
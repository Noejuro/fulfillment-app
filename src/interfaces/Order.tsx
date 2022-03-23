import IProduct from "./Product"

export default interface IOrder {
    id: number,
    userId: number,
    products: Array<IProduct>,
    items: number,
    warehouse: string,
    store: string,
    client: string,
    createdAt: string,
    updatedAt: string
}
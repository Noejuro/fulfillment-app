export default interface Product {
    id: string,
    userId: string,
    name: string,
    sku: string,
    price: number,
    quantity: number,
    img: string | undefined,
    createdAt: string,
    updatedAt: string
}
export default class Product {
    constructor ( id: number, name: string, price: number, description: string ) {
        this.id = id
        this.name = name 
        this.price = price 
        this.description = description
    }

    public id: number
    public name: string
    public price: number
    public description: string
}
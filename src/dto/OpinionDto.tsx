import User from "./UserDto"

export default class Opinion {
    constructor(id: number, productId: number, createdAt: string, opinion: string, createdBy: User) {
        this.id = id 
        this.productId = productId
        this.createdAt = createdAt
        this.opinion = opinion
        this.createdBy = createdBy
    }

    public id: number 
    public productId: number 
    public createdAt: string 
    public opinion: string 
    public createdBy: User
}
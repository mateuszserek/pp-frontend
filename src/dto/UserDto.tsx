export default class User {
    constructor(id: number, firstName: string, lastName: string, email: string) {
        this.id = id 
        this.firstName = firstName
        this.lastName = lastName 
        this.email = email
    }

    public id: number 
    public firstName: string 
    public lastName: string 
    public email: string
}
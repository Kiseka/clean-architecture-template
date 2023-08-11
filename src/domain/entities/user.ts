export interface IUser {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string,
    accountVerified?:boolean
}
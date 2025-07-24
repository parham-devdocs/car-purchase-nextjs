

export interface UserLogin{
    emailOrUsername:string
    password:string
}

export interface User{
    email:string
    password:string
    firstName:string
    lastName:string
    username:string
    phoneNumber:string
    receiveEmails:boolean
    refreshToken:string
    age:number
    licenseNumber:number
}
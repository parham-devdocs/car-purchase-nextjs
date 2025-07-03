

export interface Reservation{
    pickupLocation:string
    returnLocation?:string
    pickupDate:Date
    returnDate:Date
    pickupTime:string
    returnTime:string
    driverAge:number
}
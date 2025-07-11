

export interface Reservation{
    car_id:string
    user_id:string
    pickupLocation:string
    returnLocation?:string
    pickupDate:Date
    returnDate:Date
    pickupTime:string
    returnTime:string
    driverAge:number
}
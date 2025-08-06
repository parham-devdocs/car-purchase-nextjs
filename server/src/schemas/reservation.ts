
import { z } from "zod";



export const createReservationModel=z.object({
    vehicle:z.number({message:"car_id is required"}),
    pickupDate:z.string({message:"pickup date is required"}),
    returnDate:z.string({message:"return date is required"}),
    pickupTime:z.string({message:"time is required "}),
    returnTime:z.string({message:"time is required "}),
    pickupLocation:z.string({message:"pickup location is required"}),
    returnLocation:z.string({message:"return location is required"})





})



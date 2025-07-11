
import { z } from "zod";



export const craeteReservationModel=z.object({
    car_id:z.number({message:"car_id is required"}),
    user_id:z.number({message:"user_id is required"}),
    pickupLocation:z.string({message:"pickup location is required "}),
    returnLocation:z.string({message:"return location is required "}),
    pickupDate:z.string({message:"pickup date is required"}),
    returnDate:z.string({message:"return date is required"}),
    pickupTime:z.string({message:"time is required "}),
    returnTime:z.string({message:"time is required "}),




})



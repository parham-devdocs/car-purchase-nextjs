
import { z } from 'zod';
export const createVehicleSchema=z.object({
  model:z.string({message:"model is required"}),
  type:z.enum(["van","SUV","truck","car"]),
  image:z.string().optional(),
   automaticTransmission:z.boolean({message:"transmission type must be either manual or automatic"}),
  maxPassengers:z.number({message:"max passengers is required"}).min(0,{message:"a vehicle must have at least one door"}),
  numberOfDoors:z.number({message:"number of doors is required"}).min(2,{message:"lastname must have at least 3 characters"}),
  luggageCapacity:z.number({message:"luggage capacity is required"}),
 options:z.enum(["Cruise Control","AM/FM Radio","Air Conditioner","2 Wheel Drive","Bluetooth", "Sunroof", "Leather Seats", "Gasoline Vehicle"]).optional(),
 quantity:z.number().min(0,{message:"minimum quantity is zero"}).default(0),

})

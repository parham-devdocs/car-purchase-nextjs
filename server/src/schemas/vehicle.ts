
import { z } from 'zod';

export const createVehicleSchema=z.object({
  model:z.string({message:"model is required"}),
  vehicleType:z.enum(["Van","SUV","Truck","Car"]),
  image:z.string().optional(),
   automaticTransmission:z.boolean({message:"transmission type must be either manual or automatic"}),
  maxPassengers:z.number({message:"max passengers is required"}).min(0,{message:"a vehicle must have at least one door"}),
  numberOfDoors:z.number({message:"number of doors is required"}).min(2,{message:"lastname must have at least 3 characters"}),
  pricePerDay:z.number({message:"price per day is needed"}),
available:z.boolean({message:"available is a required field"}).default(true),  
  luggageCapacity:z.number({message:"luggage capacity is required"}),
  numberPlate:z.number({message:"number of plate is required"}),
 options:z.any().optional(),
 quantity:z.number().min(0,{message:"minimum quantity is zero"}).default(0),
 locationId:z.number().optional()

})




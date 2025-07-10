import { VehicleModel } from "../models/carModel";
import { Response, Request } from "express";
import { VehicleType } from "../types/vehicle";
import httpErrors from "http-status-codes";
export async function createVehicle(req:Request<any, any,VehicleType>, res: Response) {
const {body}=req
    try {
        const existingVehicle= await VehicleModel.findOne({where:{model:body.model}})

        if (existingVehicle) {
            res.json({error:"vehicle already exists"}).status(httpErrors.CONFLICT )
            return
        }

      const newVehicle=  await VehicleModel.create({model:body.model,image:body.image, type:body.type,luggageCapacity:body.luggageCapacity,maxPassengers:body.maxPassengers,automaticTransmission:body.automaticTransmission,numberOfDoors:body.numberOfDoors,options:body.options,quantity:body.quantity})
      res.json({newVehicle})
    } catch (error) {
  res.json({error}).status(500)
    }
}

  
export async function getVehicles(req: Request, res: Response) {
    try {
        const vehicles=await VehicleModel.findAll()
        if (!vehicles) {
            res.json({message:"no vehicle found" , data:[]})
            return
        }
        res.send({message:"no vehicle found", data:vehicles});
    } catch (error) {
        res.json({error}).status(500)

    }
  
}


export function getSingleVehicle(req:Request,res:Response) {
    const {id}=req.params 
    res.send(id)
}

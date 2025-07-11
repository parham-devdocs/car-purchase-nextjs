import { VehicleModel } from "../models/carModel";
import { Response, Request } from "express";
import { VehicleType } from "../types/vehicle";
import httpErrors from "http-status-codes";
interface PaginationQuery {
    page?: string;   // e.g., "1"
    limit?: string;  // e.g., "10"
  }
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
export async function getPaginatedVehicles(req: Request<any,any ,VehicleType>, res: Response) {
    const {limit,page}=req.query as PaginationQuery

    const  offset=(Number(page)-1) *Number(limit)

    try {
        const vehicles=await VehicleModel.findAll({offset:offset ,limit:Number(limit)})
        if (!vehicles) {
            res.json({message:"no vehicle found" , data:[]})
            return
        }
        res.send({ data:vehicles});
    } catch (error) {
        res.json({error}).status(500)

    }
  
}

export async function getSingleVehicle(req:Request,res:Response) {
    const {id}=req.params 

    try {
        const vehicle=await VehicleModel.findOne({where:{car_id:id}})
        console.log(vehicle?.dataValues)
                if (!vehicle) {
            res.json({message:"no vehicle found" , data:[]})
            return
        }
        res.send({ data:vehicle.dataValues});
    } catch (error) {
        res.json({error}).status(500)

    }
}

export async function updateVehicle(req:Request<any,any ,VehicleType>,res:Response) {
    const body=req.body
    const {id}=req.params
    try {
        const updatedVahicle=await VehicleModel.update(body,{where:{car_id:id}})
        if (!updatedVahicle) {
            res.json({message:"vehicle no found"})
            return
        }
        res.json({message:"vehicle updated"})

    } catch (error) {
        res.json({error}).status(500)
    }
}
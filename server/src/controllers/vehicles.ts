import prisma from "../utils/prismaClient";
import { Response, Request } from "express";
import { Vehicle } from "../types/vehicle";
import groupBy from "src/utils/groupData";
interface PaginationQuery {
    page?: string;   // e.g., "1"
    limit?: string;  // e.g., "10"
  }
  export async function createVehicle(req: Request<any, any, Vehicle>, res: Response) {
    const {luggageCapacity,image,type,maxPassengers,model,automaticTransmission,numberOfDoors,available,options,quantity,pricePerDay,numberPlate}=req.body
    console.log(req.body)
    try {
        const vehicleAlreadyExists=await prisma.vehicle.findFirst({where:{model}})
        if (vehicleAlreadyExists) {
            res.status(409).json({message:"vehicle already exists",data:[]})
            return
        }
const newVehicle= await prisma.vehicle.create({data:{image,luggageCapacity,numberPlate,pricePerDay,numberOfDoors,quantity,available,options,automaticTransmission,maxPassengers,model,type}})
res.json( newVehicle)
    } catch (error:any) {
                res.json({error:error.message}).status(500)
          
    }
  }

  
export async function getVehicles(req: Request, res: Response) {
    try {
        const vehicles=await prisma.vehicle.findMany()
        if (!vehicles) {
            res.json({message:"no vehicle found" , data:[]})
            return
        }
        const groupedByContinent = groupBy(vehicles,"type")
        res.send({ data:groupedByContinent});
    } catch (error) {
        res.json({error}).status(500)

    }
  
}
export async function getPaginatedVehicles(req: Request<any,any ,Vehicle>, res: Response) {
    const {limit,page}=req.query as PaginationQuery

    const  skip=(Number(page)-1) *Number(limit)

    try {
        const vehicles=await prisma.vehicle.findMany({skip ,take:Number(limit)})
        if (!vehicles) {
            res.json({message:"no vehicle found" , data:[]})
            return
        }
        res.send({ data:vehicles});
    } catch (error) {
        res.json({error}).status(500)

    }
  
}

// export async function getSingleVehicle(req:Request,res:Response) {
//     const {id}=req.params 

//     try {
//         const vehicle=await VehicleModel.findOne({where:{car_id:id}})
//         console.log(vehicle?.dataValues)
//                 if (!vehicle) {
//             res.json({message:"no vehicle found" , data:[]})
//             return
//         }
//         res.send({ data:vehicle.dataValues});
//     } catch (error) {
//         res.json({error}).status(500)

//     }
// }

// export async function updateVehicle(req:Request<any,any ,VehicleType>,res:Response) {
//     const body=req.body
//     const {id}=req.params
//     try {
//         const updatedVahicle=await VehicleModel.update(body,{where:{car_id:id}})
//         if (!updatedVahicle) {
//             res.json({message:"vehicle no found"})
//             return
//         }
//         res.json({message:"vehicle updated"})

//     } catch (error) {
//         res.json({error}).status(500)
//     }
// }



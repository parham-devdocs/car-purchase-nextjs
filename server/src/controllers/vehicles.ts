import prisma from "../utils/prismaClient";
import { Response, Request } from "express";
import { Vehicle } from "../types/vehicle";
import groupBy from "../utils/groupData";
interface PaginationQuery {
    page?: string;   // e.g., "1"
    limit?: string;  // e.g., "10"
  }
  export async function createVehicle(req: Request<any, any, Vehicle>, res: Response) {
const {maxPassengers,model,vehicleType,locationType,image,luggageCapacity,numberOfDoors,numberPlate,quantity,address,automaticTransmission,available,pricePerDay,options,city,continent,country}=req.body
    try {
      // 1. Check if vehicle already exists by model
      const vehicleAlreadyExists = await prisma.vehicle.findFirst({
        where: { model }
      });
  
      if (vehicleAlreadyExists) {
         res.status(409).json({ message: "Vehicle already exists", data: null });
         return
      }
      // 2. Find or create the location
        const newLocation = await prisma.location.create({
          data: {
            city,
            continent,
            country,
            address,
            locationType

          }
        });
      const newVehicle = await prisma.vehicle.create({
        data: {
          image,
          luggageCapacity,
          numberPlate,
          pricePerDay,
          numberOfDoors,
          quantity,
          available,
          options,
          automaticTransmission,
          maxPassengers,
          model,
        vehicleType,
          location: {
            connect:{id:newLocation.id}
          }
        },
        include: {
          location: true // Optional: include the location relation in the response
        }
      });
  
      res.status(201).json({ message: "Vehicle created successfully", data: newVehicle });
  return
    } catch (error: any) {
      console.error(error);
       res.status(500).json({ error: error.message });
       return
    }
  }

  
export async function getVehicles(req: Request, res: Response) {
    try {
        const vehicles=await prisma.vehicle.findMany()
        if (!vehicles) {
            res.json({message:"no vehicle found" , data:[]})
            return
        }
        const groupedByContinent = groupBy(vehicles,"vehicleType")
        res.send({ data:groupedByContinent});
    } catch (error) {
        res.json({error}).status(500)

    }
  
}
export async function getPaginatedVehicles(req:Request,res:Response) {
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

export async function getSingleVehicle(req:Request,res:Response) {
    const {id}=req.params 

    try {
        const vehicle=await prisma.vehicle.findUnique({where:{id:Number(id)}})
                if (!vehicle) {
            res.json({message:"no vehicle found" , data:[]})
            return
        }
        res.send({ data:vehicle});
    } catch (error) {
        res.json({error}).status(500)

    }
}

export async function updateVehicle(req:Request<any,any ,Vehicle>,res:Response) {
    const body=req.body
    const {id}=req.params
    try {
        const updatedVahicle=await prisma.vehicle.update({where:{id:Number(id)},data:body})
        if (!updatedVahicle) {
            res.json({message:"vehicle no found"})
            return
        }
        res.json({message:"vehicle updated"})

    } catch (error) {
        res.json({error}).status(500)
    }
}

export async function searchForVehicle(req:Request<any,any ,Vehicle>,res:Response) {

  const {luggageCapacity,maxPassengers,vehicleType}=req.query as any
    if ( !luggageCapacity&& !maxPassengers && !vehicleType ) {
      res.status(400).json({error:"at least one query parameter must be provided"})   
      return 
   }
   
   const queryParameters:any={}
       try {
           if (luggageCapacity) {
               queryParameters.luggageCapacity=Number(luggageCapacity)
           }
           if (maxPassengers) {
               queryParameters.maxPassengers=Number(maxPassengers)
           }
           if (vehicleType) {
               queryParameters.vehicleType=vehicleType
           }
           console.log(queryParameters)
           const filteredVehicles=await prisma.vehicle.findMany({where:queryParameters})
           res.json({data:filteredVehicles})
  } catch (error:any) {
    res.json({error:error.message}).status(500)

  

  
  }}
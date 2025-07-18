import {Request,Response } from "express";
import { LocationType } from "../types/location";
import prisma from "../utils/prismaClient";
import { Prisma } from "@prisma/client";
export async function createLocation(req: Request<any, any, LocationType>, res: Response) {
    const { city, country, address, type, continent } = req.body;

    console.log("Received data:", req.body);

    try {
        const newLocation = await prisma.location.create({
            data: {
                city,
                country,
                address,
                type,
                continent, 
            }
        });

        res.json({ message: "Location created", data: newLocation });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
             res.status(409).json({ error: "Location already exists" });
             return
        }

        console.error("Server error:", error);
         res.status(500).json({ error: "Server error" });
    }
}

export async function getAllLocations(req:Request<any,any ,LocationType>,res:Response) {
    try {
        const allLocations= await prisma.location.findMany()
        if (!allLocations) {
            res.status(409).json({error:"no location found"})
            return
        }
        const groupedByContinent = allLocations.reduce<{[key:string]:LocationType[]}>((acc, location) => {
            const continent = location.continent;
          
            if (!acc[continent]) {
              acc[continent] = []; // create a new array for this continent
            }
          
            acc[continent].push(location); // add the location to the continent group
          
            return acc;
          }, {});

        
        res.json({date:groupedByContinent})
        return
       
    } catch (error) {
       
        res.status(500).json({error:"server error"})
    }

   
}


export async function deleteLocationById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params
   const modifiedNumber=Number(id)
  try {
    const location = await prisma.location.findUnique({
      where: { id:modifiedNumber },
    });

    if (!location) {
     res.status(404).json({ error: 'Location not found' });
     return
    }

    await prisma.location.delete({
      where: { id:modifiedNumber },
    });

     res.status(200).json({ message: 'Location deleted successfully' });
     return
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });

  }
}

export async function getLocationById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params
    const modifiedNumber=Number(id)
    try {
        const location = await prisma.location.findUnique({
            where: { id:modifiedNumber },
          });
          if (location) {
            res.json({message:"location found", data:location})
            return
          }
          res.status(404).json({message:"location not found"})

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateReservationById(req:Request<any,any ,LocationType>,res:Response) {
    const { id } = req.params
    const {city,country,type,address}=req.body
    const modifiedNumber=Number(id)
    
    try {
        const location = await prisma.location.findUnique({
            where: { id:modifiedNumber },
          });
          if (location) {
            const updatedLocation=await prisma.location.update({where:{id:modifiedNumber},data:{address,city,country,type}})
            console.log(updatedLocation)
            if (updatedLocation) {
                res.json({message:"location updated", data:location})
                return

            }
        
          }
          res.status(404).json({message:"location not found"})
return
    } catch (error) {
        res.status(500).json({message:"server error"})

    }
}


export async function getLoationBySearch(req:Request<any,any ,LocationType>,res:Response) {
    const query=req.query 
if (!query || !query.city || !query.country || !query.type ) {
   res.status(400).json({error:"at least one query parameter must be provided"})   
   return 
}
const queryParameters:any={}
    try {
        if (query.city) {
            queryParameters.city=query.city
        }
        if (query.country) {
            queryParameters.country=query.country
        }
        if (query.type) {
            queryParameters.type=query.type
        }
            const foundLocation=await prisma.location.findFirst({where:queryParameters})
           if (foundLocation) {
            res.json({data:foundLocation})
            return
           }
           res.status(500).json({error:"server error"})   
    } catch (error) {
        res.status(500).json({error:"server error"})   

    }
}


import {Request,Response } from "express";
import { LocationType } from "../types/location";
import prisma from "../utils/prismaClient";
import { Prisma } from "@prisma/client";
import groupBy from "../utils/groupData";
export async function createLocation(req: Request<any, any, LocationType>, res: Response) {
    const { city, country, address,locationType, continent } = req.body;

    try {
        const newLocation = await prisma.location.create({
            data: {
                city,
                country,
                address,
                locationType,
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
        const numberOfLocationsInNorthAmerica=await prisma.location.count({where:{continent:"North America"}})
        const numberOfLocationsInCentralAfrica=await prisma.location.count({where:{continent:"Central Africa"}})
        const numberOfLocationsInAsia=await prisma.location.count({where:{continent:"Asia"}})
        const numberOfLocationsInMiddleEast=await prisma.location.count({where:{continent:"Middle East"}})
        const numberOfLocationsInSouthAmerica=await prisma.location.count({where:{continent:"South America"}})

        if (!allLocations) {
            res.status(409).json({error:"no location found"})
            return
        }
      const groupedByContinent= groupBy(allLocations,"continent")

        
        res.json({locations:groupedByContinent,numberOfLocationsInAsia,numberOfLocationsInCentralAfrica,numberOfLocationsInMiddleEast,numberOfLocationsInNorthAmerica,numberOfLocationsInSouthAmerica})
        return
       
    } catch (error) {
       
        res.status(500).json({error:"server error"})
    }

   
}


export async function deleteLocationById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params
   const modifiedNumber=Number(id)
  try {
    const location = await prisma.location.findFirst({
      where: { id:modifiedNumber },
    });

    if (!location) {
     res.status(404).json({ error: 'Location not found' });
     return
    }

  const deletedLocation=  await prisma.location.delete({
      where: { id:modifiedNumber },
    });

     res.status(200).json({ message: 'Location deleted successfully' });
     return
  } catch (error:any) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error:error.message });

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
    const {city,country,locationType,address}=req.body
    const modifiedNumber=Number(id)
    
    try {
        const location = await prisma.location.findUnique({
            where: { id:modifiedNumber },
          });
          if (location) {
            const updatedLocation=await prisma.location.update({where:{id:modifiedNumber},data:{address,city,country,locationType}})
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
    const {city,country,type}=req.query 
   
if ( !city && !country && !type ) {
   res.status(400).json({error:"at least one query parameter must be provided"})   
   return 
}
const queryParameters:any={}
    try {
        if (city) {
            queryParameters.city=city
        }
        if (country) {
            queryParameters.country=country
        }
        if (type) {
            queryParameters.type=type
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



export async function getLocationsOfCityOrContinentOrCountry(req:Request<any,any ,LocationType>,res:Response) {
    type LocationKeys= keyof Pick<LocationType,"city"| "continent"|"country">
    const { city, country, continent, locationType } = req.query;
const where:Prisma.LocationWhereInput={}
if (typeof city === 'string') {
    where.city = city;
  }
  
  if (typeof country === 'string') {
    where.country = country;
  }
  
  if (typeof continent === 'string') {
    where.continent = continent;
  }
  
    // Validate that at least one query param is provided
    if (!city && !country && !continent && !locationType) {
       res.status(400).json({
        error: "At least one of 'city', 'country', 'continent', or 'type' must be provided",
      });
      return
    }

    const validKeys: LocationKeys[] = ['city', 'country', 'continent'];
    const queryKey = (Object.keys(req.query).find(key => validKeys.includes(key as LocationKeys)) as LocationKeys);
     try {
        if (!queryKey) {
             res.status(400).json({
              error: "Invalid query parameter — must be one of 'city', 'country', 'continent', or 'type'",
            });
            return
          }
         const allLocations= await prisma.location.findMany({where:{OR:[{country:where.country},{city:where.city},{continent:where.continent}]}})
         if (!allLocations) {
             res.status(409).json({error:"no location found"})
             return
         }
       const groupedByContinent= groupBy(allLocations,queryKey)
 
         
            res.json({data:groupedByContinent})   
     } catch (error) {
        res.status(500).json({error:"server error"})   

     }
     


  }


 
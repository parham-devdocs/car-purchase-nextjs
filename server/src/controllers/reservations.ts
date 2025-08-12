import Prisma from "../utils/prismaClient";
import { Reservation } from "../types/reservation";
import { Request,Response } from "express";
import {VehicleType} from "../types/vehicle";
import { decodeJWT } from "../utils/jwt";
export async function createReservation(
    req: Request<any, any, Reservation>,
    res: Response
  ) {
    const {
      returnDate,
      returnTime,
      returnLocation,
      pickupDate,
      pickupLocation,
      pickupTime,
      vehicle,
    } = req.body;
  
    console.log("Request Body:", req.body);
  
    // 1. Validate required fields
    if (!pickupLocation) {
      res.status(400).json({ message: "Pickup location is required" });
      return
    }
    if (!returnLocation) {
     res.status(400).json({ message: "Return location is required" });
     return
    }
    if (!vehicle) {
     res.status(400).json({ message: "Vehicle is required" });
     return
    }
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) {
       res.status(400).json({ message: "All date and time fields are required" });
       return
    }
  
    // 2. Extract and verify token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
       res.status(401).json({ message: "Authorization token missing" });
       return
    }
  
    let decodedToken;
    try {
      decodedToken = +decodeJWT(token, "access") as any
    } catch (err) {
       res.status(401).json({ message: "Invalid or expired token" });
       return
    }
  
    
    try {
      // 3. Check if user already has a reservation
      const userHasReservation = await Prisma.reservation.findFirst({
        where: { userId:decodedToken },
      });
  
      if (userHasReservation) {
         res.status(403).json({ message: "User already has a reservation" });
         return
      }
  
      // 4. Find locations by locationName
      const pickupLocationRecord = await Prisma.location.findUnique({
        where: { locationName: pickupLocation },
        select: { id: true },
      });
  
      const returnLocationRecord = await Prisma.location.findUnique({
        where: { locationName: returnLocation },
        select: { id: true },
      });
  
      if (!pickupLocationRecord) {
         res.status(404).json({
          message: `Pickup location "${pickupLocation}" not found`,
        });
        return
      }
  
      if (!returnLocationRecord) {
         res.status(404).json({
          message: `Return location "${returnLocation}" not found`,
        });
        return
      }
  
      // 5. Create reservation
      const newReservation = await Prisma.reservation.create({
        data: {
          user: { connect: {id:decodedToken} },
          vehicle: { connect: { id: vehicle } },
          pickupLocation: { connect: { id: pickupLocationRecord.id } },
          returnLocation: { connect: { id: returnLocationRecord.id } },
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
        },
      });
       res.status(201).json({
        message: "Reservation created successfully",
        data: newReservation,
      });
      return
    } catch (error: any) {
      console.error("Reservation creation failed:", error);
  
      if (error.code === "P2025") {
         res.status(404).json({ message: "Related record not found" });
         return
      }
  
       res.status(500).json({
        message: "Server error. Please try again.",
        error: error.message,
      });
      return
    }
  }
export async  function getAllReservations(req:Request<any,any ,Reservation>,res:Response) {
   try {
    const allReservations=await Prisma.reservation.findMany()
    res.json({date:allReservations})

    if (!allReservations) {
        res.json({error:"no reservation found",data:[]})
    }
   } catch (error) {
    res.json({error}).status(500)

   }
 }



 export async function getReservationByVehicleId(req:Request<any,any ,VehicleType>,res:Response) {
const id=req.params.id
    try {
        const reservation=await Prisma.reservation.findUnique({where:{id},include:{vehicle:true,user:true}})
        if (!reservation) {
             res.status(404).json({ message: "Vehicle not found" });
            return
        }
    

        res.json({reservation})


    } catch (error) {
        res.json({error}).status(500)

    }
}


export async function deleteReservationById(req:Request<any,any ,Reservation>,res:Response) {
    const {id}=req.params
    const token=req.headers["authorization"]?.split(" ")[1] as string
    const userId=decodeJWT(token,"access")
    try {
      const reservationIsAvilable= await Prisma.reservation.findFirst({where:{userId:+userId,id:+id}})
      if (!reservationIsAvilable) {
        res.status(404).json({error:"reservation not found"})
        return

      }
        await Prisma.reservation.delete({where:{userId:+userId,id:+id}})
       
res.json({message:"item deleted"})
    } catch (error:any) {
        res.status(500).json({error:error.message})
    }

}


export async function updateReservationById(req:Request<any,any ,Reservation>,res:Response) {
    const {id}=req.params
    const numberId=Number(id)
    const {pickupDate,pickupLocation,pickupTime,returnDate,returnTime,returnLocation}=req.body
    try {
   
        await Prisma.reservation.update({where:{id:numberId},data:{pickupDate,pickupTime,returnDate,returnTime}})
        res.json({message:"reservation updated"})
    } catch (error:any) {
        res.status(500).json(error.message)
    }
   
}

export async function getSingleReservationById(req:Request<any,any ,Reservation>,res:Response) {
    const {id}=req.params

    try {
        const reservation=await Prisma.reservation.findUnique({where:{id:Number(id)},include:{vehicle:true,pickupLocation:true,returnLocation:true}})
   
        res.json({data:reservation})
    } catch (error:any) {
        res.status(500).json(error.message)
    }
}


export async function getReservationRelatedToUser(req:Request<any,any ,Reservation>,res:Response) {
    const token=req.headers["authorization"]?.split(" ")[1] as string
    const userId=decodeJWT(token,"access")
    try {

        const userReservation= await Prisma.reservation.findFirst({where:{userId:Number(userId)},include:{vehicle:true}})
        if (!userReservation) {
            res.status(404).json({message:"no reservation found"})
            return
        }
        res.json({data:userReservation})
    } catch (error) {
        res.status(500).json(error)

    }
}
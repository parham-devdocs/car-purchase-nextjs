import Prisma from "../utils/prismaClient";
import { Reservation } from "../types/reservation";
import { Request,Response } from "express";
import {VehicleType} from "../types/vehicle";
import { decodeJWT } from "../utils/jwt";
export async function createReservation(req:Request<any,any ,Reservation>,res:Response) {
    const {returnDate,returnTime,returnLocation,pickupDate,pickupLocation,pickupTime,vehicle}=req.body
   const cookie=req.cookies["accessToken"]
   const decodedToken=decodeJWT(cookie,"access") as any


    try {
        const userHasAlreadyAReservation=await Prisma.reservation.findFirst({where:{user:decodedToken}})
        if (userHasAlreadyAReservation) {
            res.status(403).json({message:"user has already a reservation"})
            return
        }
        const vehicleIsAvailableAtPickupLocation= await Prisma.vehicle.findUnique({where:{locationId:pickupLocation}})
        console.log(vehicleIsAvailableAtPickupLocation)
        const newReservation = await Prisma.reservation.create({
            data: {
              user:{connect:{username:decodedToken}}, // must match an existing User.id
              vehicle: {connect:{id:vehicle}}, // assuming this is a valid vehicle ID or will be set later
          
              pickupLocation: {
               connect:{id:pickupLocation}
              },
          
              returnLocation: {
                connect: {
                  id:returnLocation // must match an existing Location.id
                }
              },
          
              pickupDate: pickupDate,
              pickupTime: pickupTime,
              returnDate: returnDate,
              returnTime: returnTime
            }
          });    
         res.json({data:newReservation,message:"new reservation created"})
        
    } catch (error) {
        res.json(error).status(500)
    }

}

export async  function getAllReservations(req:Request<any,any ,Reservation>,res:Response) {
   try {
    const allReservations=await Prisma.reservation.findMany()
    res.json({allReservations})

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
    try {
        await Prisma.reservation.delete({where:{id}})
       
res.json({message:"item deleted"})
    } catch (error) {
        res.status(500).json({error})
    }

}


export async function updateReservationById(req:Request<any,any ,Reservation>,res:Response) {
    const {id}=req.params
    const numberId=Number(id)
    const {pickupDate,pickupLocation,pickupTime,returnDate,returnTime,returnLocation}=req.body
    try {
   
        await Prisma.reservation.update({where:{id:numberId},data:{pickupDate,pickupLocationId:pickupLocation,pickupTime,returnDate,returnLocationId:returnLocation,returnTime}})
        res.json({message:"reservation updated"})
    } catch (error:any) {
        res.status(500).json(error.message)
    }
   
}

export async function getSingleReservationById(req:Request<any,any ,Reservation>,res:Response) {
    const {id}=req.params
   
    try {
        const reservation=await Prisma.reservation.findUnique({where:{id}})
   
        res.json({data:reservation})
    } catch (error) {
        res.status(500).json(error)
    }
}


export async function getReservationRelatedToUser(req:Request<any,any ,Reservation>,res:Response) {
    const {id}=req.params
    try {

        const userReservation= await Prisma.reservation.findFirst({where:{userId:Number(id)},include:{vehicle:true}})
        if (!userReservation) {
            res.status(404).json({message:"no reservation found"})
            return
        }
        res.json({data:userReservation})
    } catch (error) {
        res.status(500).json(error)

    }
}
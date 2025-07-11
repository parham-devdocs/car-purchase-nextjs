import { ReservationModel } from "../models/reservationModel"
import { Reservation } from "../types/reservation";
import { Request,Response } from "express";


export async function createReservation(req:Request<any,any ,Reservation>,res:Response) {
    const body=req.body
   
    try {
     
    
        const newReservation=await ReservationModel.create({...body})
        res.json({newReservation})

        
    } catch (error) {
        res.json({error}).status(500)
    }

}

export async  function getAllReservations(req:Request<any,any ,Reservation>,res:Response) {
   try {
    const allReservations=await ReservationModel.findAll()
    res.json({allReservations})

    if (!allReservations) {
        res.json({error:"no reservation found",data:[]})
    }
   } catch (error) {
    res.json({error}).status(500)

   }
 }
import { ReservationModel } from "src/models/reservationModel"
import { Reservation } from "../types/reservation";
import { Request,Response } from "express";


export async function createReservation(req:Request<any,any ,Reservation>,res:Response) {
    const body=req.body
    const {carId,userId}=req.params
    try {
        const newReservation=await ReservationModel.create({car_id:carId,userId,...body})
        res.json({newReservation}).status(500)

        
    } catch (error) {
        res.json({error}).status(500)
    }

}
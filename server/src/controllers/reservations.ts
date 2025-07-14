// import { VehicleModel } from "../models/carModel";
// import { ReservationModel } from "../models/reservationModel"
// import { Reservation } from "../types/reservation";
// import { Request,Response } from "express";
// import {VehicleType} from "../types/vehicle";

// export async function createReservation(req:Request<any,any ,Reservation>,res:Response) {
//     const body=req.body
   
//     try {
     
    
//         const newReservation=await ReservationModel.create({...body})
//         res.json({newReservation})

        
//     } catch (error) {
//         res.json({error}).status(500)
//     }

// }

// export async  function getAllReservations(req:Request<any,any ,Reservation>,res:Response) {
//    try {
//     const allReservations=await ReservationModel.findAll()
//     res.json({allReservations})

//     if (!allReservations) {
//         res.json({error:"no reservation found",data:[]})
//     }
//    } catch (error) {
//     res.json({error}).status(500)

//    }
//  }



//  export async function getReservationByVehicleIdAndUserId(req:Request<any,any ,VehicleType>,res:Response) {
//     const user_id = parseInt(req.params.user_id);
// const car_id = parseInt(req.params.car_id);
//     try {
//         const vehicle=await VehicleModel.findOne({where:{car_id},include:ReservationModel})
//         if (!vehicle) {
//              res.status(404).json({ message: "Vehicle not found" });
//             return
//         }
//         // const renter=vehicle.dataValues.Reservations.filter((r:any)=>{ return r.user_id===user_id})
//         const reservations = vehicle.dataValues.Reservations || [];

// // Filter by user_id
// const matchingReservation = reservations.find(
//   (reservation: any) => reservation.user_id === user_id
// );
//         res.json({reservation:matchingReservation})


//     } catch (error) {
//         res.json({error}).status(500)

//     }
// }


// export async function deleteReservationById(req:Request<any,any ,Reservation>,res:Response) {
//     const {reservation_id}=req.params
//     try {
//         await ReservationModel.destroy({where:{reservation_id}})
       
// res.json({message:"item deleted"})
//     } catch (error) {
//         res.status(500).json({error})
//     }

// }


// export async function updateReservationById(req:Request<any,any ,Reservation>,res:Response) {
//     const {reservation_id}=req.params
//     const {pickupDate,pickupLocation,pickupTime,returnDate,returnTime,returnLocation}=req.body

//     try {
//         const reservation=await ReservationModel.findOne({where:{reservation_id}})
   
//         await reservation?.update({pickupDate,pickupLocation,pickupTime,returnDate,returnLocation,returnTime})
//         res.json({message:"reservation updated"})
//     } catch (error) {
//         res.status(500).json(error)
//     }
   
// }

// export async function getSingleReservationById(req:Request<any,any ,Reservation>,res:Response) {
//     const {reservation_id}=req.params
   
//     try {
//         const reservation=await ReservationModel.findOne({where:{reservation_id}})
   
//         res.json({data:reservation})
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }
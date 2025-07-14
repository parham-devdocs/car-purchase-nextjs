// import {Request,Response } from "express";
// import { LocationType } from "../types/location";
// import { LocationModel } from "../models/location";

// export async function createLocation(req:Request<any,any ,LocationType>,res:Response) {
    
//     const {city,country,address,type}=req.body

//     try {
//         const newLocation=await LocationModel.create({country,city,address,type})
//   res.json(newLocation.dataValues)
//     } catch (error) {
//         res.status(500).json(error)
//     }

// }
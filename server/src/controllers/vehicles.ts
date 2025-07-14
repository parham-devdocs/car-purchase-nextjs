// import { VehicleModel } from "../models/carModel";
// import { Response, Request } from "express";
// import { VehicleType } from "../types/vehicle";
// import httpErrors from "http-status-codes";
// import { LocationModel } from "../models/location";
// import { CarInventoryModel } from "../models/carInventoryModel";
// interface PaginationQuery {
//     page?: string;   // e.g., "1"
//     limit?: string;  // e.g., "10"
//   }
//   export async function createVehicle(req: Request<any, any, VehicleType>, res: Response) {
// //     const {location_id,luggageCapacity,image,type,maxPassengers,model,automaticTransmission,numberOfDoors,options,quantity,car_id}=req.body
// //     try {
// //         const vehicleAlreadyExists=await VehicleModel.findOne({where:{model}})
// //         if (vehicleAlreadyExists) {
// //             res.status(409).json({message:"vehicle already exists",data:[]})
// //             return
// //         }
// // const newVehicle= await VehicleModel.create({location_id,luggageCapacity,image,type,model,maxPassengers,automaticTransmission,numberOfDoors,options,quantity})
// // res.json( newVehicle.dataValues)
// //     } catch (error) {
// //                 res.json({error}).status(500)
          
// //     }
// const vehicle=await VehicleModel.findAll()
// const location=await LocationModel.findAll()
// const inventory= await CarInventoryModel.findAll()
// console.log(vehicle,location,inventory)
//   }

  
// export async function getVehicles(req: Request, res: Response) {
//     try {
//         const vehicles=await VehicleModel.findAll()
//         if (!vehicles) {
//             res.json({message:"no vehicle found" , data:[]})
//             return
//         }
//         res.send({message:"no vehicle found", data:vehicles});
//     } catch (error) {
//         res.json({error}).status(500)

//     }
  
// }
// export async function getPaginatedVehicles(req: Request<any,any ,VehicleType>, res: Response) {
//     const {limit,page}=req.query as PaginationQuery

//     const  offset=(Number(page)-1) *Number(limit)

//     try {
//         const vehicles=await VehicleModel.findAll({offset:offset ,limit:Number(limit)})
//         if (!vehicles) {
//             res.json({message:"no vehicle found" , data:[]})
//             return
//         }
//         res.send({ data:vehicles});
//     } catch (error) {
//         res.json({error}).status(500)

//     }
  
// }

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



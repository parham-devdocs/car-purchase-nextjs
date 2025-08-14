import {Request,Response } from "express";
import { VehicleType } from "../../types/vehicle";
import prisma from "../../utils/prismaClient";

export async function getTotalNumberOfVehicles(req: Request<any, any, VehicleType>, res: Response) {
    const totalNumberOfVehicles= await prisma.vehicle.count()
    res.json({totalNumberOfVehicles})
    
}


export async function getTotalNumberOfVehiclesByTime(req: Request<any, any, VehicleType>, res: Response) {
   
    const data = [
        { name: 'Jan', numberOfVehicles: 120 },
        { name: 'Feb', numberOfVehicles: 80 },
        { name: 'Mar', numberOfVehicles: 150 },
        { name: 'Apr', numberOfVehicles: 100 },
        { name: 'May', numberOfVehicles: 200 },
        { name: 'Jun', numberOfVehicles: 180 },
        { name: 'Jul', numberOfVehicles: 250 },
        { name: 'Aug', numberOfVehicles: 220 },
        { name: 'Sep', numberOfVehicles: 170 },
        { name: 'Oct', numberOfVehicles: 140 },
        { name: 'Nov', numberOfVehicles: 90 },
        { name: 'Dec', numberOfVehicles: 110 },
      ];
      res.json({data})
}

export function getRevenueByVehicleType(req: Request<any, any, VehicleType>, res: Response) {
    const data = [
        { name: 'Jan', numberOfVehicles: 450 },
        { name: 'Feb', numberOfVehicles: 480 },
        { name: 'Mar', numberOfVehicles: 530 },
        { name: 'Apr', numberOfVehicles: 180 },
        { name: 'May', numberOfVehicles: 200 },
        { name: 'Jun', numberOfVehicles: 180 },
        { name: 'Jul', numberOfVehicles: 250 },
        { name: 'Aug', numberOfVehicles: 360 },
        { name: 'Sep', numberOfVehicles: 570 },
        { name: 'Oct', numberOfVehicles: 340 },
        { name: 'Nov', numberOfVehicles: 460 },
        { name: 'Dec', numberOfVehicles: 490 },
      ];
      res.json(data)
    
}

export function getVehiclesByCountry(req: Request<any, any, VehicleType>, res: Response) {
    const data = [
        { country: 'US', numberOfVehicles: 90 },
        { country: 'Canada', numberOfVehicles: 72 },
        { country: 'Austraulia', numberOfVehicles: 62 },
        { country: 'Russia', numberOfVehicles: 54 },
        { country: 'Britain', numberOfVehicles: 51 },
        { others: 'Egypt', numberOfVehicles: 42 }
      ];
      res.json(data)
    
}


export function getVehiclesByContinent(req: Request<any, any, VehicleType>, res: Response) {

    const data = [
        { country: 'North America', numberOfVehicles: 450 },
        { country: 'Central Africa', numberOfVehicles: 480 },
        { country: 'Asia', numberOfVehicles: 530 },
        { country: 'Middle East', numberOfVehicles: 180 },
        { country: 'South America', numberOfVehicles: 200 },
        { others: 'Europe', numberOfVehicles: 180 }
      ];
      res.json(data)

}



export function getTotalNumberOfVehiclesByVehicleTypes(req: Request<any, any, VehicleType>, res: Response) {
     const data = [
        { country: 'Van', numberOfVehicles: 134 },
        { country: 'SUV', numberOfVehicles: 60 },
        { country: 'Car', numberOfVehicles:490 },
        { country: 'Truck', numberOfVehicles: 180 },
   
      ];
      res.json(data)
    
}
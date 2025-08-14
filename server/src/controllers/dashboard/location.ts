

import {Request,Response } from "express";
import { VehicleType } from "../../types/vehicle";
import prisma from "../../utils/prismaClient";


export async function getTotalNumberOfLocations(req:Request,res:Response) {
    const totalNumberOfLocations= await prisma.location.count()
    res.json({totalNumberOfLocations})
}

export function getNumberOfLocationsByTime(req:Request,res:Response) {
    const data = [
        { name: 'Jan', numberOfVehicles: 60 },
        { name: 'Feb', numberOfVehicles: 80 },
        { name: 'Mar', numberOfVehicles: 75 },
        { name: 'Apr', numberOfVehicles: 62 },
        { name: 'May', numberOfVehicles: 51 },
        { name: 'Jun', numberOfVehicles: 49 },
        { name: 'Jul', numberOfVehicles: 68 },
        { name: 'Aug', numberOfVehicles: 59 },
        { name: 'Sep', numberOfVehicles: 42 },
        { name: 'Oct', numberOfVehicles: 86 },
        { name: 'Nov', numberOfVehicles: 73 },
        { name: 'Dec', numberOfVehicles: 46 },
      ];
      res.json({data})
}
import {Request,Response } from "express";
import { VehicleType } from "../../types/vehicle";
import prisma from "../../utils/prismaClient";


export async function getTotalNumberOfUsers(req:Request,res:Response) {
    const totalNumberOfUsers= await prisma.user.count()
    res.json({totalNumberOfUsers})
}

export function getNumberOfUsersByTime(req:Request,res:Response) {
    const data = [
        { name: 'Jan', numberOfVehicles: 680 },
        { name: 'Feb', numberOfVehicles: 800 },
        { name: 'Mar', numberOfVehicles: 750 },
        { name: 'Apr', numberOfVehicles: 620 },
        { name: 'May', numberOfVehicles: 510 },
        { name: 'Jun', numberOfVehicles: 490 },
        { name: 'Jul', numberOfVehicles: 680 },
        { name: 'Aug', numberOfVehicles: 590 },
        { name: 'Sep', numberOfVehicles: 420 },
        { name: 'Oct', numberOfVehicles: 860 },
        { name: 'Nov', numberOfVehicles: 730 },
        { name: 'Dec', numberOfVehicles: 460 },
      ];
      res.json({data})
}
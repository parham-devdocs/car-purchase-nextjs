import { allVehicles } from "../data";
import { Response, Request } from "express";

export function getVehicles(req: Request, res: Response) {
  
    res.send(allVehicles);
   
}


export function getSingleVehicle(req:Request,res:Response) {
    const {id}=req.params 
    res.send(id)
}
import { VehicleModel } from "../models/carModel";
import { Response, Request } from "express";
import { User } from "../types/user";
import httpErrors from "http-status-codes";
import { ReservationModel } from "../models/reservationModel";
import { Reservation } from "../types/reservation";
import { UserModel } from "../models/userModel";
interface PaginationQuery {
    page?: string;   // e.g., "1"
    limit?: string;  // e.g., "10"
  }
export async function createUser(req:Request<any, any,User>, res: Response) {
const {body}=req
    try {
        const existingUser= await UserModel.findOne({where:{email:body.email}})

        if (existingUser) {
            res.json({error:"user already exists"}).status(httpErrors.CONFLICT )
            return
        }

      const newUser=  await UserModel.create({username:body.username,password:body.password,email:body.email,driversAge:body.driversAge,licenceNumber:body.licenceNumber,firstName:body.firstName,lastName:body.lastName,phoneNumber:body.phoneNumber,receiveEmails:body.receiveEmails})
      res.json({newUser})
    } catch (error) {
        console.log(body)

  res.json({error}).status(500)
    }
}

  
export async function getUsers(req: Request, res: Response) {
    try {
        const users=await UserModel.findAll()
        if (!users) {
            res.json({message:"no user found" , data:[]})
            return
        }
        res.send({ data:users});
    } catch (error) {
        res.json({error}).status(500)

    }
  
}
export async function getPaginatedUsers(req: Request<any,any ,User>, res: Response) {
    const {limit,page}=req.query as PaginationQuery

    const  offset=(Number(page)-1) *Number(limit)

    try {
        const users=await UserModel.findAll({offset:offset ,limit:Number(limit)})
        if (!users) {
            res.json({message:"no user found" , data:[]})
            return
        }
        res.send({ data:users});
    } catch (error) {
        res.json({error}).status(500)

    }
  
}

export async function getSingleUser(req:Request,res:Response) {
    const {id}=req.params 
  

    try {
        const user=await UserModel.findOne({where:{userId:id}})
                if (!user) {
            res.json({message:"no user found" , data:[]})
            return
        }
        res.send({ data:user.dataValues});
    } catch (error) {
        res.json({error}).status(500)

    }
}

export async function updateUser(req:Request<any,any ,User>,res:Response) {
    const body=req.body
    const {id}=req.params
    try {
        const updatedUser=await UserModel.update(body,{where:{user_id:id}})
        if (!updatedUser) {
            res.json({message:"user no found"})
            return
        }
        res.json({message:"user updated"})

    } catch (error) {
        res.json({error}).status(500)
    }
}


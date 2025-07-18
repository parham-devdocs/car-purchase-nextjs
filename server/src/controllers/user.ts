import { Response, Request } from "express";
import { User } from "../types/user";
import prisma  from "../utils/prismaClient";
interface PaginationQuery {
    page?: string;   // e.g., "1"
    take?: string;  // e.g., "10"
  }

export async function getUsers(req: Request, res: Response) {
    try {
        const users=await prisma.user.findMany()
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
    const {take,page}=req.query as PaginationQuery

    const  skip=(Number(page)-1) *Number(take)
    try {
        const users=await prisma.user.findMany({skip,take:Number(take)})
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
        const user=await prisma.user.findUnique({where:{id:Number(id)}})
                if (!user) {
            res.json({message:"no user found" , data:[]})
            return
        }
        res.send({ data:user});
    } catch (error) {
        res.json({error}).status(500)

    }
}

export async function updateUser(req:Request<any,any ,User>,res:Response) {
    const body=req.body
    const {id}=req.params
console.log(body)
    try {
        const updatedUser=await prisma.user.update({where:{id:Number(id)},data:body})
        if (!updatedUser) {
            res.json({message:"user no found"})
            return
        }
        res.json({message:"user updated"})

    } catch (error) {
        res.json({error}).status(500)
    }
}


export async function getReservationsOfUsers(req:Request<any,any ,User>,res:Response) {
    const {id}=req.params
    try {
        const user=await prisma.user.findUnique({where:{id:Number(id)},include:{reservation:true}})
        if (!user) {
    res.json({message:"no user found" , data:[]})
    return
}
res.send({ data:user});
    } catch (error) {
        res.json({error}).status(500)

    }
}
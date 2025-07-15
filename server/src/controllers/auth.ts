import { Request, Response } from "express";
import { UserLogin, User } from "../types/user";
import { decodeJWT, generateAccessToken, generateRefreshToken } from "../utils/jwt";
import prisma from "../utils/prismaClient";
import httpErrors from "http-status-codes";
import { hash ,compare} from "../utils/hash"
export async function login(req: Request<any, any, UserLogin>, res: Response) {
  const { body } = req;
  const accessToken = generateAccessToken(body.emailOrUsername);
  const refreshToken = generateRefreshToken(body.emailOrUsername);
  //////  saving refreshToken i data base
try {
  const user= await prisma.user.findFirst({where:{OR :[
    { username: body.emailOrUsername },
    { email: body.emailOrUsername }
  ]}}) 
if (user) {
  const password=await compare(body.password,user?.password)
  if (password) {
    res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .send({ accessToken, refreshToken });
  }

}

  ////////

} catch (error) {
  
}

}

export async function register(req: Request<any, any, User>, res: Response) {
  const { body } = req;
  const accessToken = generateAccessToken(body.username);
  const refreshToken = generateRefreshToken(body.username);
  const hashedPassword=await hash(body.password)


try {
  const existingUsername = await prisma.user.findFirst({where:{username:body.username}}) 
  const existingEmail=await prisma.user.findFirst ({where:{email:body.email}}) 
  const existingLicenceNumber=await prisma.user.findFirst({where:{licenceNumber:body.licenceNumber}})

  if (existingUsername || existingLicenceNumber || existingEmail) {
   res.json({error:"user already exists"}).status(httpErrors.CONFLICT)
   return
  }
 
  const newUser=await prisma.user.create({data:{
    username:body.username,
    phoneNumber:body.phoneNumber,
    password:hashedPassword,
    email:body.email,
    age:body.age,
    licenceNumber:body.licenceNumber,
    firstName:body.firstName,
    lastName:body.lastName,
     refreshToken:refreshToken,
     receiveEmails:body.receiveEmails
  }})
  res
  .cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  .send({accessToken, newUser: newUser });
} catch (error) {
  console.error(error)
}

 
}

export async function auth(req: Request, res: Response) {

  try {
    let userRole;
    const userCookies=req.cookies.accessToken
   const decodedToken= decodeJWT(userCookies,"access") as string
    userRole=await prisma.user.findFirst({where:{username:decodedToken},select:{role:true}})

    res.json({ userRole });
  } catch (error) {
    console.log(error);
    res.send(error);
  }

}

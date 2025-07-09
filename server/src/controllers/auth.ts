import { Request, Response } from "express";
import { UserLogin, User } from "../types/user";
import { decodeJWT, generateAccessToken, generateRefreshToken } from "../utils/jwt";
import  {UserModel} from "../models/userModel";
import { hash } from "../utils/hash"
export async function login(req: Request<any, any, UserLogin>, res: Response) {
  const { body } = req;
  const accessToken = generateAccessToken(body.emailOrUsername);
  const refreshToken = generateRefreshToken(body.emailOrUsername);
  //////  saving refreshToken i data base
const user=await UserModel.update(
  { username: body.emailOrUsername },
  {
    where: {
      lastName: null,
    },
  },
);
 
  ////////
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .send({ accessToken, refreshToken });
}

export async function register(req: Request<any, any, User>, res: Response) {
  const { body } = req;
  const accessToken = generateAccessToken(body.username);
  const refreshToken = generateRefreshToken(body.username);
  const hashedPassword=await hash(body.password)
try {
  const newUser= await UserModel.create({
    username:body.username,
    phoneNumber:body.phoneNumber,
    password:hashedPassword,
    email:body.email,
    driversAge:body.driversAge,
    licenceNumber:body.licenceNumber,
    firstName:body.firstName,
    lastName:body.lastName,
     refreshToken:refreshToken,
     receiveEmails:body.receiveEmails
  })
  res
  .cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  .send({accessToken, newUser: newUser.dataValues });
} catch (error) {
  console.error(error)
}

 
}

export async function auth(req: Request, res: Response) {

  try {
    let userRole;
    const userCookies=req.cookies.accessToken
   const decodedToken= decodeJWT(userCookies,"access")
   if (decodedToken) {
    userRole= UserModel.findOne({where:{role:decodedToken}}) || UserModel.findOne({where:{role:decodedToken}}) 

   }
   else{
    userRole="user"
   }
   

    res.json({ userRole });
  } catch (error) {
    console.log(error);
    res.send(error);
  }

}

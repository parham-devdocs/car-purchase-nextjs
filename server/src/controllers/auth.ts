import { Request, Response } from "express";
import { UserLogin, User } from "../types/user";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import  {UserModel} from "../models/userModel";
import { CarModel } from "../models/carModel";
import runTests from "../models/testAll";
import { ReservationModel } from "../models/reservationModel";

export async function login(req: Request<any, any, UserLogin>, res: Response) {
  const { body } = req;
  const accessToken = generateAccessToken(body.emailOrUsername);
  const refreshToken = generateRefreshToken(body.emailOrUsername);
  //////  saving refreshToken i data base

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
console.log(body)
  const accessToken = generateAccessToken(body.username);
  const refreshToken = generateRefreshToken(body.username);
const newUser= await UserModel.create({
  username:"parha77m1428",
  phoneNumber:"66848786",
  password:"kmfv58ewFD3#",
  email:"paz575a@gmail.com",
  driversAge:18,
  licenceNumber:"887648484",
  firstName:"ali",
  lastName:"lwkef",
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

    .send({ accessToken, refreshToken,newUser: newUser.dataValues });
    const updatedUser=UserModel.findByPk( newUser.dataValues.user_id)
    console.log(updatedUser)
}

export async function auth(req: Request, res: Response) {
  const { body } = req;
  try {
    // Create a new user

    res.json({ body });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  ////// search in data base for role of the user
  const role = "user";
  ///////
}

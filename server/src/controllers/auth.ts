import {  Request,Response } from "express";
import { UserLogin, User } from "src/types/user";
import {  generateAccessToken, generateRefreshToken } from "../utils/jwt";
import prisma from "../prisma/client";
export function login(req:Request<any,any,UserLogin>,res:Response) {
    const {body}=req
  
  const accessToken=generateAccessToken(body.emailOrUsername)
  const refreshToken=generateRefreshToken(body.emailOrUsername)
  //////  saving refreshToken i data base 

  ////////
  res.cookie("accessToken",accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  }).send({accessToken,refreshToken})

}



export function register(req:Request<any,any,User>,res:Response) {
    const {body}=req

    //// checking if the user email or username has not already exist


    /////
    const accessToken=generateAccessToken(body.username)
    const refreshToken=generateRefreshToken(body.username)
    res.cookie("accessToken",accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }).send({accessToken,refreshToken})
}

export function auth(req:Request,res:Response) {
  const {body}=req 

  ////// search in data base for role of the user
const role="user"
  ///////
 
res.json({role} )
}
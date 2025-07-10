import jwt  from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken';
import * as jwtJsDecode from 'jwt-js-decode';

interface JwtPayloadWithUsername extends jwt.JwtPayload { username: string;  }


export function generateAccessToken(payload:string) {
    const privateKey=process.env.JWT_ACCESS_TOKEN
    if (!privateKey) {
        throw new Error ("jwt private key is undefined")
    }
    try {
       const accessToken= jwt.sign({payload},privateKey,{ expiresIn: 60 * 60*3 })
         return accessToken
    } catch (error:any) {
        throw new Error(error)
    }
}


export function generateRefreshToken(payload:string) {
    const privateKey=process.env.JWT_REFRESH_TOKEN
    if (!privateKey) {
        throw new Error ("jwt private key is undefined")
    }
    try {
       const refreshToken= jwt.sign({payload},privateKey,{ expiresIn: 60 * 60 * 24 * 7 })
         return refreshToken
    } catch (error:any) {
        throw new Error(error)
    }
}





export function decodeJWT(token: string, tokenType: "access" | "refresh"): JwtPayload | string {
    const privateKey = tokenType === "refresh"
        ? process.env.JWT_REFRESH_TOKEN
        : process.env.JWT_ACCESS_TOKEN

    if (!privateKey) {
        throw new Error(`Missing private key for ${tokenType} token`);
    }

    try {
        const decoded = jwt.verify(token, privateKey) as JwtPayloadWithUsername;
        // console.log(decoded.payload)
        console.log(decoded.username)
        if (!decoded) {
          throw new Error ("token in not decoced successfully")
            
        }
        return decoded.username; // This will be a JwtPayload or string depending on how the token was created
    } catch (error) {
        throw new Error(`Invalid token: ${(error as Error).message}`);
    }
}
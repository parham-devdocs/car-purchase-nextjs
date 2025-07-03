import jwt  from "jsonwebtoken";
export function generateAccessToken(payload:string) {
    const privateKey=process.env.JWT_ACCESS_TOKEN
    if (!privateKey) {
        throw new Error ("jwt private key is undefined")
    }
    try {
       const accessToken= jwt.sign({payload},privateKey,{ expiresIn: 60 * 60 })
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


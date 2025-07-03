import { Response, Request, NextFunction } from "express";
import httpErrors from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyAccessToken = () => {
 return (req: Request,res: Response,next: NextFunction)=>{
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(httpErrors.UNAUTHORIZED).json({ message: "Authorization header missing" });
    return;
  }

  const bearerToken = authHeader.split(" ")[1];
  const privateKey = process.env.JWT_ACCESS_TOKEN;

  if (!privateKey) {
    res.status(httpErrors.INTERNAL_SERVER_ERROR).json({
      message: "JWT secret not configured",
    });
    return;
  }

  try {
    const decoded = jwt.verify(bearerToken, privateKey) as JwtPayload;
    (req as any).user = decoded; // You can improve this with custom typings
    next();
  } catch (error) {
    res.status(httpErrors.UNAUTHORIZED).json({ message: "token expired" });
    return;
  }
 }
  
};
import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";

export default function genericValidation(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);

      req.body = parsedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
         res.status(httpStatus.BAD_REQUEST).json({
          message: "Validation failed",
          errors: error.errors,
        });
        return
      }

       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
      return
    }
  };
}
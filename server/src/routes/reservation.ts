

import { Router } from "express";
import { getVehicles,getSingleVehicle, createVehicle, getPaginatedVehicles, updateVehicle, getUserByVehicleId } from "../controllers/vehicles";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
const router = Router();


export default router;



import { Router } from "express";
import { getVehicles,getSingleVehicle, createVehicle, getPaginatedVehicles, updateVehicle, getUserByVehicleId } from "../controllers/vehicles";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createVehicleSchema } from "../schemas/vehicle";
const router = Router();

router.get("/", verifyAccessToken(), getVehicles);
router.put("/:id",verifyAccessToken(),updateVehicle)
router.get("/paginated",verifyAccessToken(),getPaginatedVehicles)
router.post("/", verifyAccessToken(),validationMiddleware( createVehicleSchema ), createVehicle);
router.get("/:id",verifyAccessToken(),getSingleVehicle)
router.get("/:id/reservations",getUserByVehicleId)
export default router;

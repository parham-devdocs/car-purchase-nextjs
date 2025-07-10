import { Router } from "express";
import { getVehicles,getSingleVehicle, createVehicle, getPaginatedVehicles } from "../controllers/vehicles";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createVehicleSchema } from "../schemas/vehicle";
const router = Router();

router.get("/", verifyAccessToken(), getVehicles);
router.get("/paginated",verifyAccessToken(),getPaginatedVehicles)
router.post("/", verifyAccessToken(),validationMiddleware( createVehicleSchema ), createVehicle);
router.get("/:id",verifyAccessToken(),getSingleVehicle)
export default router;

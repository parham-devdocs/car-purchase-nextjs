import { Router } from "express";
import { getVehicles,getSingleVehicle } from "../controllers/vehicles";
import { verifyAccessToken } from "../middlewares/verifyToken";
const router = Router();

router.get("/", verifyAccessToken(), getVehicles);
router.get("/:id",verifyAccessToken(),getSingleVehicle)
export default router;

import { Router } from "express";
import {  createVehicle,getVehicles} from "../controllers/vehicles";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createVehicleSchema } from "../schemas/vehicle";
const router = Router();

router.get("/", verifyAccessToken(), getVehicles);
// router.put("/:id",verifyAccessToken(),updateVehicle)
// router.get("/paginated",verifyAccessToken(),getPaginatedVehicles)
router.post("/",validationMiddleware(createVehicleSchema), createVehicle);
// router.get("/:id",verifyAccessToken(),getSingleVehicle)
export default router;

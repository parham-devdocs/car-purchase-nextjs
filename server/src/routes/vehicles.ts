import { Router } from "express";
import {  createVehicle,getPaginatedVehicles,getSingleVehicle,getVehicles,updateVehicle,searchForVehicle} from "../controllers/vehicles";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createVehicleSchema } from "../schemas/vehicle";
const router = Router();

router.get("/", getVehicles);
router.get("/paginated",verifyAccessToken(),getPaginatedVehicles)
router.get("/search",searchForVehicle)
router.put("/:id",verifyAccessToken(),updateVehicle)
router.post("/",validationMiddleware(createVehicleSchema), createVehicle);
router.get("/:id",verifyAccessToken(),getSingleVehicle)

export default router;

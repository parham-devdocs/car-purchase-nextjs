

import { Router } from "express";
import { createReservation,getAllReservations,getReservationByVehicleId,getSingleReservationById,deleteReservationById,updateReservationById,getReservationRelatedToUser} from "../controllers/reservations";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createReservationModel } from "../schemas/reservation";
const router = Router();

router.post("/",verifyAccessToken(), createReservation);
router.get("/",verifyAccessToken(),getAllReservations)
router.get("/user/:id",verifyAccessToken(),getReservationRelatedToUser)
router.get("/:id",verifyAccessToken(),getReservationByVehicleId)
router.delete("/:id",verifyAccessToken(),deleteReservationById)
router.put("/:id",verifyAccessToken(),updateReservationById)
router.get("/:id",verifyAccessToken(),getSingleReservationById)
export default router;

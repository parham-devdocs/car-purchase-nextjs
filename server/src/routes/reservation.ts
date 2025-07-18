

import { Router } from "express";
import { createReservation, getAllReservations,getReservationByVehicleIdAndUserId ,deleteReservationById, updateReservationById, getSingleReservationById} from "../controllers/reservations";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createReservationModel } from "../schemas/reservation";
const router = Router();

// router.post("/",verifyAccessToken(), validationMiddleware(CraeteReservationModel), createReservation);
router.get("/",verifyAccessToken(),getAllReservations)
router.get("/:user_id/:car_id",verifyAccessToken(),getReservationByVehicleIdAndUserId)
router.delete("/:reservation_id",deleteReservationById)
router.put("/:reservation_id",updateReservationById)
router.get("/:reservation_id",getSingleReservationById)
export default router;



import { Router } from "express";
import { createReservation,getAllReservations,getReservationByVehicleId,getSingleReservationById,getReservationRelatedToUser, updateReservationById, deleteReservationById} from "../controllers/reservations";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createReservationModel } from "../schemas/reservation";
const router = Router();

router.post("/",verifyAccessToken(),validationMiddleware(createReservationModel), createReservation);
router.get("/",verifyAccessToken(),getAllReservations)
router.get("/user/:id",verifyAccessToken(),getReservationRelatedToUser)
router.get("/vehicle/:id",verifyAccessToken(),getReservationByVehicleId)
router.delete("/:id",verifyAccessToken(),deleteReservationById)
router.put("/:id",verifyAccessToken(),updateReservationById)
router.get("/:id",verifyAccessToken(),getSingleReservationById)
export default router;

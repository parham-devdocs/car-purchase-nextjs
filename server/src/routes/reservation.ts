

import { Router } from "express";
import { createReservation,getAllReservations,getReservationByVehicleId,getSingleReservationById,deleteReservationById,updateReservationById,getReservationRelatedToUser} from "../controllers/reservations";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createReservationModel } from "../schemas/reservation";
const router = Router();

router.post("/", createReservation);
router.get("/",getAllReservations)
router.get("/user/:id",getReservationRelatedToUser)
router.get("/:id",verifyAccessToken(),getReservationByVehicleId)
router.delete("/:id",deleteReservationById)
router.put("/:id",updateReservationById)
router.get("/:id",getSingleReservationById)
export default router;

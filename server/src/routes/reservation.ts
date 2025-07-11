

import { Router } from "express";
import { createReservation, getAllReservations } from "../controllers/reservations";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { craeteReservationModel } from "../schemas/reservation";
const router = Router();

router.post("/",verifyAccessToken(), validationMiddleware(craeteReservationModel), createReservation);
router.get("/",verifyAccessToken(),getAllReservations)
export default router;

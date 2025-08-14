import { Router }  from "express";
import validationMiddleware from "../../middlewares/validation";
import { verifyAccessToken } from "../../middlewares/verifyToken";
import { getTotalNumberOfReservations,getTotalNumbrOfReservationsByTime } from "../../controllers/dashboard/reservation";
const router=Router()
router.get("/getTotalNumberOfReservations",getTotalNumberOfReservations)
router.get("/getTotalNumbrOfReservationsByTime",getTotalNumbrOfReservationsByTime)
export default router
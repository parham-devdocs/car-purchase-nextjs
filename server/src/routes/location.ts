



import { Router } from "express";
import { createLocation} from "../controllers/location";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { craeteReservationModel } from "../schemas/reservation";
const router = Router();

router.post("/", createLocation);
// router.get("/",getAllReservations)
// router.delete("/:location_id",deleteReservationById)
// router.put("/:location_id",updateReservationById)
// router.get("/:location_id",getSingleReservationById)
export default router;

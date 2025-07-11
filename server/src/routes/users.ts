import { Router } from "express";
import { getUserByVehicleId, createReservation } from "../controllers/vehicles";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createUserSchema } from "../schemas/user";
import { createUser, getPaginatedUsers, getSingleUser, getUsers, updateUser } from "../controllers/user";
const router = Router();

router.get("/", verifyAccessToken(), getUsers);
router.put("/:id",verifyAccessToken(),updateUser)
router.get("/paginated",verifyAccessToken(),getPaginatedUsers)
router.post("/", verifyAccessToken(),validationMiddleware( createUserSchema ), createUser);
router.get("/:id",verifyAccessToken(),getSingleUser)
router.get("/:id/reservations",getUserByVehicleId)
router.post("/reservations/:car_id/:user_id",createReservation)
export default router;

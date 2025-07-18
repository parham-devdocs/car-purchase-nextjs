import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import { createUserSchema } from "../schemas/user";
import {  getPaginatedUsers, getSingleUser, getUsers, updateUser,getReservationsOfUsers } from "../controllers/user";
const router = Router();

router.get("/", verifyAccessToken(), getUsers);
router.put("/:id",verifyAccessToken(),updateUser)
router.get("/paginated",verifyAccessToken(),getPaginatedUsers)
router.get("/:id",verifyAccessToken(),getSingleUser)
router.get("/:id/reservations",verifyAccessToken(),getReservationsOfUsers)
export default router;

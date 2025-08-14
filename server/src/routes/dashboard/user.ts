import { Router }  from "express";
import validationMiddleware from "../../middlewares/validation";
import { verifyAccessToken } from "../../middlewares/verifyToken";
import {getNumberOfUsersByTime,getTotalNumberOfUsers  } from "../../controllers/dashboard/user";
const router=Router()
router.get("/getTotalNumberOfUsers",getTotalNumberOfUsers)
router.get("/getNumberOfUsersByTime",getNumberOfUsersByTime)

export default router
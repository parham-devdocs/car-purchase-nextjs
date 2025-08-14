import { Router }  from "express";
import validationMiddleware from "../../middlewares/validation";
import { verifyAccessToken } from "../../middlewares/verifyToken";
import {getNumberOfLocationsByTime,getTotalNumberOfLocations  } from "../../controllers/dashboard/location";
const router=Router()

router.get("/getTotalNumberOfLocations",getTotalNumberOfLocations)
router.get("/getNumberOfLocationsByTime",getNumberOfLocationsByTime)

export default router
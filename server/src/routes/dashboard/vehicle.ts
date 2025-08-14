import { Router }  from "express";
import validationMiddleware from "../../middlewares/validation";
import { verifyAccessToken } from "../../middlewares/verifyToken";
import { getRevenueByVehicleType,getTotalNumberOfVehicles,getTotalNumberOfVehiclesByTime,getTotalNumberOfVehiclesByVehicleTypes,getVehiclesByContinent,getVehiclesByCountry } from "../../controllers/dashboard/vehicle";
const router=Router()
router.get("/totalNumberOfVehicles",getTotalNumberOfVehicles)
router.get("/numberOfVehiclesByTime",getTotalNumberOfVehiclesByTime)
router.get("/getRevenueByVehicleType",getRevenueByVehicleType)
router.get("/getVehiclesByCountry",getVehiclesByCountry)
router.get("/getVehiclesByContinent",getVehiclesByContinent)
router.get("/getTotalNumberOfVehiclesByVehicleTypes",getTotalNumberOfVehiclesByVehicleTypes)
export default router
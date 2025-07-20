



import { Router } from "express";
import { createLocation,getAllLocations,getLoationBySearch,getLocationById,getLocationsOfCityOrContinentOrCountry,deleteLocationById,updateReservationById} from "../controllers/location";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import {createLocationModel} from "../schemas/location";
const router = Router();

router.post("/",verifyAccessToken(),validationMiddleware(createLocationModel), createLocation);
router.get("/search",getLoationBySearch)
router.get("/relatedLocations",getLocationsOfCityOrContinentOrCountry)
router.get("/",verifyAccessToken(),getAllLocations)
router.delete("/:id",deleteLocationById)
router.get("/:id",getLocationById)
router.put("/:id",updateReservationById)
export default router;

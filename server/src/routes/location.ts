



import { Router } from "express";
import getLocationsInCountry, { createLocation,getAllLocations,getLoationBySearch,getLocationById,getLocationsOfCityOrContinentOrCountry,deleteLocationById,updateReservationById} from "../controllers/location";
import { verifyAccessToken } from "../middlewares/verifyToken";
import validationMiddleware from "../middlewares/validation";
import {createLocationModel} from "../schemas/location";
const router = Router();

router.post("/",verifyAccessToken(),validationMiddleware(createLocationModel), createLocation);
router.get("/search",verifyAccessToken(),getLoationBySearch)
router.get("/relatedLocations",verifyAccessToken(),getLocationsOfCityOrContinentOrCountry)
router.get("/",verifyAccessToken(),getAllLocations)
router.get("/country/:country",verifyAccessToken(),getLocationsInCountry)
router.delete("/:id",verifyAccessToken(),deleteLocationById)
router.get("/:id",verifyAccessToken(),getLocationById)
router.put("/:id",verifyAccessToken(),updateReservationById)
export default router;

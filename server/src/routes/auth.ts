import { Router }  from "express";
import { auth, login, logout, refreshToken, register } from "../controllers/auth";
import validationMiddleware from "../middlewares/validation";
import { userLoginSchema, userRegisterSchema} from "../schemas/auth";
import { verifyAccessToken } from "../middlewares/verifyToken";
const router=Router()
router.get("/",verifyAccessToken(),auth)
router.post("/login",validationMiddleware(userLoginSchema),login)
router.post("/register",validationMiddleware(userRegisterSchema),register)
router.get("/logout",verifyAccessToken(),logout)
router.get("/refresh",verifyAccessToken(),refreshToken)
export default router
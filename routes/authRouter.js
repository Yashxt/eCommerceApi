import {registerController,loginController,testController,forgotPasswordController} from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();
router.post("/register",registerController)
router.post("/login",loginController)
router.get("/test",requireSignIn,isAdmin,testController);

router.post("/forgot-password",forgotPasswordController)
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true,
    })
})
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true,
    })
})
export default router;
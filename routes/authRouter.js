import {registerController,loginController,testController,forgotPasswordController,updateProfileController} from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRETKEY);


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

//update profile
router.put("/profile",requireSignIn,updateProfileController)

router.post("/create-checkout-session", async (req, res) => {
    try {
      const { products } = req.body;
  
      const lineItems = products.map((product) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.image || "https://via.placeholder.com/150"], // fallback image
            },
            unit_amount: product.price * 100, // Stripe accepts price in cents
          },
          quantity: product.quantity || 1, // default quantity to 1
        };
      });
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      });
  
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: "Something went wrong during checkout" });
    }
  });
  
export default router;
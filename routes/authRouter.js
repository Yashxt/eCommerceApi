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

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image || "https://via.placeholder.com/150"], // fallback image
        },
        unit_amount: Math.round(product.price * 100), // Always use Math.round to avoid decimal issues
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
  
export default router;
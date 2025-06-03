import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/userModel.js";

dotenv.config();

export const requireSignIn = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header is required" });
    }

    // Ensure the token starts with 'Bearer ' it specifies that it is authorized to access theservices
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format. Token must start with 'Bearer '" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    // Verify the token
    const decode = JWT.verify(token, process.env.JWT_SECRETKEY);
  
    // Attach decoded user data to the request object
    req.user = decode;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification error:", error.message);

    // Send an appropriate error response
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
//admin access
export const isAdmin = async(req,res,next)=>{
    try{
  const user = await userModel.findById(req.user._id)
    if(user.role !== 1){
        return res.status(401).json({
           success:false, 
           message:"unauthorized access",
        })
    }
    else{
        next();
    }
    }
    catch(error){
        res.status(401).json({
            success:false,
            error,
            message:"error in admin middle ware",
        })
    }
}

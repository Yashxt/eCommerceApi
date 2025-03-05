import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken"  // for authen purpose


 export const  registerController = async (req,res)=>{
try{
    const {name,email,password,phone,address,answer} = req.body;
    if(!name){
   return  res.send({message:"name is required"});
    }if(!email){
      return  res.send({message:"email is required"});
    }if(!password){
       return res.send({message:"password is required"});
    }if(!phone){
      return  res.send({message:"phone is required"});
    }
    if(!address){
      return  res.send({message:"address is required"});
    }
    if(!answer){
      return  res.send({message:"answer  is required"});
    }
    
    //checking for existing account
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return  res.status(200).send({
                success:false,
                message:"user already exists plz login",
            })
        }
        //register new user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name,email,password:hashedPassword,phone,address,answer}).save();
        res.status(201).send({
            success:true,
            message:"user created succesfully",
            user,
        }) 
}
catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error in registration",
      error
    })
}

}

export const forgotPasswordController = async(req,res)=>{
   try{ 
      const {email,answer,newPassword} = req.body;
       if(!email){
        res.status(400).send({message:"email is required"});
       }
       if(!answer){
        res.status(400).send({message:"answer is required"});
       }
       if(!newPassword){
        res.status(400).send({message:"new password is required"});
       }
       const user = await userModel.findOne({email,answer});

       //validation
       if(!user){
        return res.status(404).send({
          success:false,
          message:"wrong email or answer",
        })
       }
        const  hashed  = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
          success:true,
          message:"password reseted succesfully",
        })
   }
   catch(error){
   console.log(error);
   res.status(500).send({
    success:false,
    message:"something went wrong",
    error,
   })
   }
}
export const loginController = async(req,res)=>{
 try{
const {email,password} = req.body;
//validation
if(!email || !password){
   return res.status(404).send({
    success:true,
    message:"invalid email or password",
  })
}
 //check user of the pass is correct or not
 const user = await userModel.findOne({email});
 if(!user){
  return res.status(404).send({

    success:false, 
    message:"email is not registered",
  })
 }
 const match = await comparePassword(password,user.password);
 if(!match){
  return res.status(200).send({
    success:false,
    message:"invaild password",
  })
 }
 //use to create json web token

 const token = await JWT.sign({_id:user._id.toString()},process.env.JWT_SECRETKEY,{expiresIn :"7d"});
 res.status(200).json({
  success:true,
  message:"login succesfully",
  user:{
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    role:user.role,
  },token
 })
 }

catch(error){
  console.log(error);
  res.status.send({
    success:false,
    message:"error in login",
    error:error, 
  })

}
}

export const testController = async(req,res)=>{
  try{
res.send("protectedd routes");
  }
  catch(error){
    res.send({error});
  }

}
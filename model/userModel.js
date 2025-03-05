import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true ,
      trim:true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,

    }

},{
    timestamps:true
});
// we defined a function with the schema when we create the objrct of it  so with values we can access this function
 //instance method
//userSchema.method.generateToken =()=>{

//jwt.sign()
//}
export default  mongoose.model("users",userSchema);
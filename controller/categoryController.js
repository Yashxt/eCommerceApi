import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";

 
 export const createCategoryController = async(req,res) =>  {
  try{
  const {name} = req.body;
  if(!name){
   return  res.status(401).send({message:"name is required"})
  }
  const existingCategory =  await categoryModel.findOne({name})
  if(existingCategory){
   return  res.status(200).send({success:true,
        message:"category already Exists",
    })
  }
  const category = await new categoryModel({name,slug:slugify(name,{lower:true})}).save()
  res.status(201).send({
    success:true,
    message:"new category created",
    category,})


  }
  catch(error){
     console.log(error);
     res.status(500).send({
        success:false,
        error,
        message:"Error in category"
     })
}

}
export const updateCategoryController = async(req,res)=>{
 try{
 const {name} = req.body;
 const{id} = req.params;
 const category =   await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name,{lower:true})},{new:true} )

 res.status(200).send({
    success:true,
    message:"updated succesfully",
    category,
 })
 }
 catch(error){
    console.log(error);
    res.status(500).send({success:false,
        error,
        message:"error while updating",
    })
 }

}
//get all cat
export const categoryController = async(req,res)=>{
     try{
   const category = await categoryModel.find({});
     res.status(200).send({
        success:true,
        message:"All Category list ",
        category,
     })
     }
     catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while getting all categories",
        })
     }

}
//get simgle cat
export const singleCategoryController = async(req,res)=>{
    try{
        
        const category = await categoryModel.findOne({slug:req.params.slug});
      res.status(200).send({
        success:true,
        category,
        message:"get single category success"
      })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while getting single category"
        })
    }
}
//delete a particular category
export const deleteCategoryController = async(req,res)=>{
try{
  const{id} = req.params;
  await categoryModel.findByIdAndDelete(id);
  res.status(200).send({
    success:true,
    message:"succesfully deleted category"
  })
}
catch(error){
  console.log(error);
  res.status(500).send({
    success:false,
    error,
    message:"error while deleting category"
  })
}
}
import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";
import fs from 'fs';
 import productModel from '../model/productModel.js';
 export const createCategoryController = async(req,res) =>  {
  try{
  const {name} = req.fields;
  const {photo} = req.files;
  if(!name){
   return  res.status(401).send({message:"name is required"})
  }
  const existingCategory =  await categoryModel.findOne({name})
  if(existingCategory){
   return  res.status(200).send({success:true,
        message:"category already Exists",
    })
  }
  const category =  new categoryModel({name,slug:slugify(name,{lower:true})})
   if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    await category.save();
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


export const imageController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.id)
      .select('+photo');

    if (!category || !category.photo || !category.photo.data) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.set('Content-Type', category.photo.contentType);
    return res.status(200).send(category.photo.data);      // Buffer goes straight out
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error while getting photo',
      error: error.message,
    });
  }
};

// controller/productController.js



export const getProductsByCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    // Optional: fetch category ID from slug if needed
    const category = await categoryModel.findOne({ slug });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Fetch products with matching category
    const products = await productModel.find({ category: category._id }).populate('category');

    res.status(200).json({
      success: true,
      category: category.name,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products by category",
      error: error.message,
    });
  }
};

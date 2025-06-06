import productModel from "../model/productModel.js"
import fs from "fs"
import slugify from "slugify";

export const createProductController = async(req,res)=>{
try{
const {name,description,price,category,quantity,shipping} = req.fields;
const {photo} = req.files;
switch (true) {
    case !name:
      return res.status(500).send({ error: "Name is Required" });
    case !description:
      return res.status(500).send({ error: "Description is Required" });
    case !price:
      return res.status(500).send({ error: "Price is Required" });
    case !category:
      return res.status(500).send({ error: "Category is Required" });
    case !quantity:
      return res.status(500).send({ error: "Quantity is Required" });
    case photo && photo.size > 1000000:
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 1mb" });
  }
  const products = new productModel({...req.fields,slug:slugify(name,{lower:true})})
  if (photo) {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
  }
  await products.save();
  res.status(201).send({
    success: true,
    message: "Product Created Successfully",
    products,
  });


}
catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error while creating product",
    })
}
}
//get product
export const getProductController = async(req,res)=>{
  try{
   const product = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1}).populate("category");
   res.status(200).send({
    success:true,
    countTotal:product.length,
    product,
    message:"All Products",
   })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error while accesing category",
        error:error.message,
    })
  }

}
export const getSingleProductController = async(req,res)=>{
try{
   const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
   res.status(200).send({
    success:true,
    product,
    message:"succesfully accessed product",
   })
}
catch(error){
console.log(error);
res.status(500).send({
    success:false,
    message:"not able to access the category",
    error:error.message,
})

}

}

// get photo 
export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };
  //product delete
  export const productDeleteController = async(req,res)=>{
   try{
  await productModel.findByIdAndDelete(req.params.pid).select("-photo");
  res.status(200).send({
    success: true,
    message: "Product Deleted successfully",
  });
   }
   catch(error){
  console.log(error);
    res.status(500).send({
        success:false,
        message:"not bal eto delete at the prseent time",
        error:error.message,
    })
   }
  }
  //update product
  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };
  // filters
  export const productFiltersController = async (req, res) => {
    try {
      const { checked = [], radio = [] } = req.body; // Ensure `checked` & `radio` are always arrays
      let args = {};
  
      // Apply category filter
      if (checked.length > 0) args.category = { $in: checked };
  
      // Apply price filter only if `radio` contains exactly two numbers
      if (Array.isArray(radio) && radio.length === 2 && !isNaN(radio[0]) && !isNaN(radio[1])) {
        args.price = { $gte: Number(radio[0]), $lte: Number(radio[1]) };
      }
  
      console.log("Filtering with args:", args); // Debugging log
  
      // Fetch products
      const products = await productModel.find(args).select("-photo");
  
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.error("Filter error:", error);
      res.status(400).send({
        success: false,
        message: "Error while filtering products",
        error,
      });
    }
  };
  

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
export const productSearchController = async(req,res)=>{
  try{
   const {keyword} = req.params;
   const result = await productModel.find({
    $or : [
    {  name:{$regex:keyword, $options:"i"}}, //option(i ) means casd in sensitive
      {description:{$regex:keyword, $options:"i"}},
     ]
   }).select("-photo")
   res.json({
    result,
   })
  }
  catch(error){
  console.log(error);
  res.status(400).send({
    success:false,
    message:"error in search product api",
    error,
  })
  }

}
export const relatedProductController = async(req,res)=>{
  try{
const {pid,cid} = req.params;
const product = await productModel.find({
   category:cid,
   _id:{$ne:pid},
}).select("-photo").limit(3).populate("category");
res.status(200).send({
  success:true,
  product,
})
  }
  catch(error){
   res.status(400).send({
    success:false,
    messgae:"error while getting related productss",
    error,
   })
  }
}
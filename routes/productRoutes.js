import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController,getProductController,getSingleProductController,
    productPhotoController,productDeleteController,
    updateProductController, productFiltersController, productCountController,productListController,
    productSearchController,relatedProductController} from "../controller/productController.js";
import formidable from "express-formidable"
const router = express.Router();


router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);
//get all products
router.get("/get-product",getProductController);
//get single product
router.get("/get-product/:slug",getSingleProductController);
//get photo
router.get("/product-photo/:pid",productPhotoController);

//delete router
router.delete("/product-delete/:pid",productDeleteController);
//update router
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);


//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);
//search
router.get("/search/:keyword",productSearchController)
// related product
router.get("/similar-product/:pid/:cid",relatedProductController);

export default router

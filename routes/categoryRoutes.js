import express from "express"
import { requireSignIn ,isAdmin} from "../middlewares/authMiddleware.js";
import {createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController,imageController} from "../controller/categoryController.js";
const router = express.Router();
import formidable from "express-formidable"
router.post('/create-category',requireSignIn,isAdmin,formidable(),createCategoryController)
//update category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)
//get all category
router.get("/get-category",categoryController);
// get single category
router.get("/single-category/:slug",singleCategoryController);
//delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);
router.get("/category-photo/:id",imageController);
export default router;
const express= require("express");
const {

    getAllCategories,
    getAllRecipesByCategory,
    getCategoryById
}=require("../controllers/CategoryController");

const router=express.Router;

router.get("/",getAllCategories);
router.get("/RecipesByCategory", getAllRecipesByCategory);
router.get("/:id",getCategoryById);

module.exports = router;
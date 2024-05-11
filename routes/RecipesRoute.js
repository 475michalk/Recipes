const express = require("express");

const{

    getAllRecipes,
    getRecipesById,
    getRecipesByUser,
    getRecipesByPreparationTime,
    addRecipes,
    updateRecipe,
    deleteRecipe

}=require("../controllers/RecipeController");

const router = express.Router();
router.get("/", getAllRecipes);
router.get("/:id", getRecipesById);
router.get("/recipeByUserId", getRecipesByUser);
router.get("/recipeByPreparationTime",getRecipesByPreparationTime);
router.post("/", addRecipes);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
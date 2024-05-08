const express = require("express");

const{
    getAllRecipes,
    getRecipesById,
    addRecipes,
    updateRecipe,
    deleteRecipe

}=require("../controllers/RecipeController");

const router = express.Router();
router.get("/", getAllRecipes);
router.get("/:id", getRecipesById);
router.post("/", addRecipes);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
const express = require("express");
const { upload } = require("../middlewares/uploadFile");
const {
  getAllRecipes,
  getRecipesById,
  getRecipesByUser,
  getRecipesByPreparationTime,
  addRecipe,
  addRecipe1,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllR
} = require("../controllers/RecipeController");

const router = express.Router();
router.get("/", getAllRecipes);
router.get("/allR", getAllR);
router.get("/:id", getRecipesById);
router.get("/recipeByUserId", getRecipesByUser);
router.get("/recipeByPreparationTime", getRecipesByPreparationTime);
router.post('/', upload.array("image"), createRecipe); // Apply multer middleware
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;

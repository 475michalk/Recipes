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
  getAllR,
  getRecipesByUserId, // הוספת פונקציה חדשה
  getAllImages
} = require("../controllers/RecipeController");
const { isRegisteredUser } = require("../middlewares/auth");

const router = express.Router();
router.get("/", getAllRecipes);
router.get("/allR", getAllR);
router.get("/:id", getRecipesById);
router.get("/recipeByUserId", getRecipesByUser);
router.get('/images', getAllImages);

router.get("/user/:userId",isRegisteredUser, getRecipesByUserId); // עדכון ניתוב חדש
router.post('/', isRegisteredUser, upload.array("image"), createRecipe); // Apply multer middleware and isRegisteredUser middleware
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;

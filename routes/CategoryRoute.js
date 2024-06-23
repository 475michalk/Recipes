const express = require("express");
const { getAllCategories,
     getAllRecipesByCategory,
      getCategoryById, 
      createCategory} = require("../controllers/CategoryController");

const router = express.Router(); // צור אובייקט חדש של Router

router.get("/", getAllCategories);
router.post('/', createCategory);

router.get("/RecipesByCategory", getAllRecipesByCategory);
router.get("/:id", getCategoryById);

module.exports = router;

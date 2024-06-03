const mongoose = require("mongoose");
const { Category } = require("../models/Category");
const { Recipe } = require('../models/Recipes');
const { upload } = require('../middlewares/uploadFile');

// קבלת כל המתכונים
exports.getAllRecipes = async (req, res, next) => {
    let { search, page, perPage } = req.query;

    search ??="";
    page ??= 1;
    perPage ??= 10;
  
    try {
      const recipes = await Recipe.find({ name: new RegExp(search) })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .select("-__v");
      return res.json(recipes);
  
    } catch (error) {
      next(error);
    }
  };
exports.getAllR = async (req, res, next) => {
    try {
        const recipes = await Recipe.find().select('-__v');
        return res.json(recipes);
    } catch (error) {
        console.log(error); // יודפס השגיאה בקונסול
        next(error);
    }
};


// ID קבלת מתכון לפי 
exports.getRecipesById = (req, res, next) => {
    const id = req.params.id;
    console.log(mongoose.Types.ObjectId.isValid(id));
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else {
        Recipe.findById(id, { __v: false })
            .then(c => {
                res.json(c);
            })
            .catch(err => {
                next({ message: 'recipe not found', status: 404 })
            })
    }
};

// קבלת מתכונים לפי משתמש מסוים
exports.getRecipesByUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const recipes = await Recipe.find({ 'user._id': userId }).select('-__v');
        return res.json(recipes);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// קבלת המתכונים לפי זמן ההכנה
exports.getRecipesByPreparationTime = async (req, res, next) => {
    const maxPrepTime = req.query.preparationTime;
    try {
        const recipes = await Recipe.find({ preparationTime: { $lte: maxPrepTime } }).select('-__v');
        return res.json(recipes);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
// Update the createRecipe function to handle JSON data and multiple image files separately
exports.createRecipe = async (req, res) => {
  try {
    // Checking what comes in req.body
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Parse JSON data from the request body
    const recipeData = req.body;
    console.log(req.body);

    // Create a new Recipe object with the data from the JSON body
    const newRecipe = new Recipe({

      name: recipeData.nameRecipe,
      description: recipeData.descriptionRecipe,
      category: recipeData.categoryName,
      preparationTime: recipeData.preparationTime,
      level: recipeData.level,
      layers: recipeData.layers,
      instruction: recipeData.instructionRecipe,
      private: recipeData.privateYesOrNo,
      // Add other fields as needed from the JSON data
    });

    console.log(newRecipe.name);
    // Handle multiple image file uploads separately
    if (req.files && req.files.length > 0) {
      console.log("true");
      const imagePaths = req.files.map((file) => file.path);
      newRecipe.image = imagePaths;

    } else {
      console.log("No image files uploaded");
    }

    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe); // Returning the new recipe saved in the response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handling errors and sending an appropriate response
  }
};



// הוספת מתכון חדש
exports.addRecipe1 = async (req, res, next) => {
  try {
    
    // בדיקת קבצים שהועלו
    console.log(req.body.file);
    console.log(req.body+"body");

    // יצירת אובייקט חדש של מתכון מהנתונים בגוף הבקשה
    const newRecipe = new Recipe({ ...req.body });
    console.log(newRecipe);
    // הוספת נתיבים של התמונות אם קיימות בקבצים
    if (req.files && req.files.length > 0) {
      newRecipe.images = req.files.map(file => file.path);
    }

    // שמירת המתכון במסד הנתונים
    await newRecipe.save();

    // אם יש קטגוריות בגוף הבקשה, טיפול בהן
    if (req.body.categoryName && req.body.categoryName.length > 0) {
      const categoryPromises = req.body.categoryName.map(async category => {
        let c = await Category.findOne({ description: category });

        if (!c) {
          c = new Category({ description: category, Recipes: [] });
          await c.save();
        }

        c.Recipes.push({ _id: newRecipe._id, name: newRecipe.nameRecipe });
        await c.save();
      });

      await Promise.all(categoryPromises);
    }

    // החזרת תגובה עם קוד סטטוס 201 ונתוני המתכון שנשמרו
    return res.status(201).json(newRecipe);
  } catch (error) {
    // טיפול בשגיאות
    next(error);
  }
};


//הוספה טובה ללא מתכון
  // exports.addRecipe = async (req, res, next) => {
  //   try {
  //     // יצירת אובייקט חדש של מתכון מהנתונים בגוף הבקשה
  //     const newRecipe = new Recipe({ ...req.body });
  
  //     // שמירת המתכון במסד הנתונים
  //     await newRecipe.save();
  
  //     // אם יש קטגוריות בגוף הבקשה, טיפול בהן
  //     if (req.body.categoryName && req.body.categoryName.length > 0) {
  //       const categoryPromises = req.body.categoryName.map(async category => {
  //         let c = await Category.findOne({ description: category });
  
  //         if (!c) {
  //           c = new Category({ description: category, Recipes: [] });
  //           await c.save();
  //         }
  
  //         c.Recipes.push({ _id: newRecipe._id, name: newRecipe.nameRecipe });
  //         await c.save();
  //       });
  
  //       await Promise.all(categoryPromises);
  //     }
  
  //     // החזרת תגובה עם קוד סטטוס 201 ונתוני המתכון שנשמרו
  //     return res.status(201).json(newRecipe);
  //   } catch (error) {
  //     // טיפול בשגיאות
  //     next(error);
  //   }
  // };

// ID עדכון מתכון לפי 
exports.updateRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    try {
        const c = await Recipe.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )
        return res.json(c);
    } catch (error) {
        next(error)
    }
};

// ID מחיקת מתכון לפי 
exports.deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        try {
            let recipe = await Recipe.findById(id);
            if (!recipe)
                return next({ message: 'recipe not found', status: 404 })
            recipe.categories.forEach(async c => {
                try {
                    await Category.updateOne(
                        { name: c },
                        { $pull: { recipes: { _id: recipe._id } } }
                    )
                    let category = await Category.findOne({ name: c }).then(c => {
                        return c;
                    })
                        .catch(err => {
                            next({ message: 'category not found', status: 404 })
                        });
                    if (category.recipes.length === 0)
                        await Category.findByIdAndDelete(category._id);
                } catch (error) {
                    next(error)
                }
            })

            await Recipe.findByIdAndDelete(id)
            return res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}

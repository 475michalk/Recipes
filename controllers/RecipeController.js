const mongoose = require("mongoose");
const { Category } = require("../models/Category");
const { Recipe } = require('../models/Recipes');
const { upload } = require('../middlewares/uploadFile');


const fs = require('fs');
const path = require('path');

// פונקציה שמחזירה את רשימת כל התמונות מתקיית uploads
exports.getAllImages = (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }

    // מחזיר את רשימת כתובות התמונות
    const images = files.map(file => `/images/${file}`);
    res.json(images);
  });
};

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
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 5;
  
    try {
      const totalRecipes = await Recipe.countDocuments();
      const recipes = await Recipe.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('-__v');
      return res.json({
        recipes,
        total: totalRecipes
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  


exports.getRecipesByUserId = async (req, res) => {
  try {
    const userId = req.user.user_id; // שליפת ה-ID של המשתמש מהטוקן
    console.log("User ID:", userId);

    const recipes = await Recipe.find({ 'addedByUsers.userId': userId });

    console.log(userId);

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found for the given user ID" });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes by user ID:', error);
    res.status(500).json({ error: error.message });
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
    const recipeData = req.body;

    if (!req.user) {
      throw new Error("User not authenticated");
    }

    const userId = req.user.user_id;
    const userName = req.user.nameUser;

    const newRecipe = new Recipe({
      nameRecipe: recipeData.nameRecipe,
      descriptionRecipe: recipeData.descriptionRecipe,
      categoryName: JSON.parse(recipeData.categoryName),
      preparationTime: recipeData.preparationTime,
      level: recipeData.level,
      dateAdd: recipeData.dateAdd,
      layers: JSON.parse(recipeData.layers),
      instructionRecipe: recipeData.instructionRecipe,
      privateYesOrNo: recipeData.privateYesOrNo,
      image: JSON.parse(recipeData.image),
      addedByUsers: [{ userId, name: userName }],
    });

    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => file.filename);
      newRecipe.image = imagePaths;
    }

    const savedRecipe = await newRecipe.save();

    // const categoryPromises = newRecipe.categoryName.map(async categoryName => {
    //   let category = await Category.findOne({ name: categoryName });
    //   if (!category) {
    //     category = new Category({ name: categoryName, description: '' }); // Adjust as necessary
    //     await category.save();
    //   }
    //   category.recipes.push(savedRecipe._id);
    //   await category.save();
    // });

    // await Promise.all(categoryPromises);

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(400).json({ error: error.message });
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
      newRecipe.image = req.files.map(file => file.path);
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ message: 'id is not valid', status: 400 });
  }

  try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
          return next({ message: 'recipe not found', status: 404 });
      }

      if (Array.isArray(recipe.categories)) {
          for (const categoryName of recipe.categories) {
              try {
                  await Category.updateOne(
                      { name: categoryName },
                      { $pull: { recipes: recipe._id } }
                  );

                  const category = await Category.findOne({ name: categoryName });
                  if (category && category.recipes.length === 0) {
                      await Category.findByIdAndDelete(category._id);
                  }
              } catch (error) {
                  return next(error);
              }
          }
      }

      await Recipe.findByIdAndDelete(id);
      return res.status(204).send();
  } catch (error) {
      return next(error);
  }
};

const mongoose = require("mongoose");
const Recipe = require("../models/Recipes"); 
const Category = require("../models/Category");


// קבלת כל המתכונים
exports.getAllRecipes = async (req, res, next) => {
    let { search, page, perPage } = req.query;
    search ??= ' ';
    page ??= ' ';
    perPage ??= ' ';

    try {
        const recipes = await Recipe.find({ name: new RegExp(search) })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .select('-__v');
        return res.json(recipes);
    } catch (error) {
        next(error);
    }
}

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

// הוספת מתכון חדש
exports.addRecipe = async (req, res, next) => {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        newRecipe.categories.forEach(async category => {
            let c = await Category.findOne({ name: category })
            if (!c) {
                try {
                    const newCategory = new Category({ name: category, recipes: [] }); // שינוי כאן מ-c ל-category
                    await newCategory.save();
                    c = newCategory;
                } catch (err) {
                    next(err);
                }
            }
            category.recipes.push({ _id: newRecipe._id, name: newRecipe.name })
            await category.save();
        })
        return res.status(201).json(newRecipe);
    } catch (error) {
        next(error);
    }
}

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

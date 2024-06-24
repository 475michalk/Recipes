const mongoose=require("mongoose");

const Category = require("../models/Category");

exports.getAllCategories = async (req, res, next) => {
    try {
      const categories = await Category.find().select('name');
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };
  
  exports.createCategory = async (req, res) => {
    try {
      console.log('Request body:', req.body); // הוסף הדפסה ללוג
      const { name, description } = req.body;
  
      // בדוק אם הקטגוריה כבר קיימת
      let category = await Category.findOne({ name });
      if (category) {
        return res.status(400).json({ message: 'Category already exists' });
      }
  
      // צור קטגוריה חדשה
      category = new Category({ name, description: description || '' });
      await category.save();
  
      res.status(201).json(category);
    } catch (error) {
      console.error('Error adding category:', error); // הדפס את השגיאה ללוג
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };

exports.getAllRecipesByCategory=async(req, res, next)=> {
    try {
        const categories = await Category.find().select('-__v');
        return res.json(categories);
    } catch (error) {
        next(error);
    }
}

exports.getCategoryById=async(req, res, next)=> {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        Category.findById(id, { __v: false })
            .then(c => {
                res.json(c);
            })
            .catch(err => {
                next({ message: 'category not found', status: 404 })
            })
    }
}


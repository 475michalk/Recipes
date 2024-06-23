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
  
  exports.createCategory = async (req, res, next) => {
    try {
      const { name, description, image } = req.body;
      const newCategory = new Category({ name, description, image });
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      next(error);
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


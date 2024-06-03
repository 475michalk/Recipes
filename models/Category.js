const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  name: {
    type: String
  }
});

const CategorySchema = new Schema({
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  Recipes: {
    type: [RecipeSchema]
  },
  image: {
    type: String
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };

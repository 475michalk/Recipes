const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  image: {
    type: String
  }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;

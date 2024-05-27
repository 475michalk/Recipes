const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  nameRecipe: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  descriptionRecipe: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  categoryName: {
    type: [String],
    required: true
  },
  preparationTime: {
    type: Number,
    required: true,
    min: 0
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  dateAdd: {
    type: Date,
    default: Date.now()
  },
  layers: [{
    description: {
      type: String,
      required: true
    },
    component: {
      type: [String],
      required: true
    }
  }],
  instructionRecipe: {
    type: String
  },
  images: {
    type: [String]
  },
  privateYesOrNo: {
    type: Boolean,
    default: false
  },
  addByUser: {
    UserId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users"
    },
    name: {
      type: String,
      required: true
    }
  }
});

module.exports.RecipeSchema=RecipeSchema;
module.exports.Recipe = mongoose.model('Recipe', RecipeSchema);
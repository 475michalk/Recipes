const mongoose = require("mongoose");


const RecipeSchema=new mongoose.Schema({
    nameRecipe: {
        type: String,
        required: true,
        min:3,
        max:25
    },
     descriptionRecipe: {
        type: String,
        required: true,
        min:5,
        max:50
      },
      categoryName: {
        type: String,
        required: true,
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
      layers: {
        type: [{
            description: {
                type: String,
                required: true
            },
            component: {
                type: String,
                required: true
            }
        }],
      },
      Instructions: {
        type: String
      },
      images: {
        type: [String]
      },
       privateYesOrNo: {
        type: Boolean,
        default: false
      },
      user: {
        _id:{
           type: ObjectId,
           required:true

        },
        name:{
            type:String,
            required:true
        }
       
      }
 });
   
module.exports = mongoose.model("Recipes", RecipeSchema);

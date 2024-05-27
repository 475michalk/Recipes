const mongoose = require("mongoose");


const RecipeSchema=new mongoose.Schema({
  _id:{
    type:mongoose.Types.ObjectId
  },
  name:{
    type:String
  },
})

const CategorySchema=new mongoose.Schema({

      description: {
        type: String,
        required: true,
        minLength:5,
        maxLength:50
      },
     Recipes:{
      type:[RecipeSchema]
     },
      image: {
        type: String
      }

})


module.exports = mongoose.model("Category", CategorySchema);

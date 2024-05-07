const mongoose = require("mongoose");

const CategorySchema=new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        min:1
      },
      description: {
        type: String,
        required: true,
        min:5,
        max:50
      },
      numberOfRecipe: {
        type: Number,
        required: true,
        min: 0
      },
      image: {
        type: String
      }

})


module.exports = mongoose.model("Category", CategorySchema);

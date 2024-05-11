const mongoose = require("mongoose");

const CategorySchema=new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
      
      },
      description: {
        type: String,
        required: true,
        minLength:5,
        maxLength:50
      },
     Recipes:[{
      id:{
        type:Number,
        require:true
      }
      ,name:{
       type:String,
       require:true,
       minLength:2
      }
      
     }],
      image: {
        type: String
      }

})


module.exports = mongoose.model("Category", CategorySchema);

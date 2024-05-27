const mongoose = require("mongoose");
const Joi=require("joi");
const Jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const UserSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        // required: true,
        minLength: 2,
        maxLength: 20,
        match: /^[a-zA-Z]/,
        // unique: true // אם ברצונך ששם המשתמש יהיה ייחודי
    },
    
    email: {
        type: String,
        // required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
          ],
     },
     password: {
        type: String,
        required: true,
        match: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        minLength:4,
        maxLength:16
    },
    address: {
        type: String,
        minlength: 3,
        maxlength: 50,
        // required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default:"User"
    }
});


UserSchema.pre("save", function (next) {
    const salt = +process.env.BCRYPT_SALT | 10;
    bcrypt.hash(this.password, salt,  (err, hashPass) => {
      if (err) throw new Error(err.message);
      this.password = hashPass;
      next();
    });
  });


module.exports.UserSchema=UserSchema;
module.exports.User = mongoose.model("users", UserSchema);


module.exports.userValidators = {
    login: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'יש להזין כתובת דוא"ל תקינה',
            'any.required': 'שדה האימייל הוא שדה חובה'
        }),
        password: Joi.string().min(4).required().pattern(new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{4,}$')).messages({
            'string.min': 'הסיסמה חייבת להכיל לפחות 8 תווים',
            'string.pattern.base': 'הסיסמה חייבת לכלול לפחות אות אחת באנגלית ולפחות מספר אחד'
        }),
    })
};

//יצירת טוקן
module.exports.generateToken=(user)=> {
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const data = { role: user.role, user_id: user._id };
    const token = Jwt.sign(data, privateKey, { expiresIn: '1h' });
    return token;
}

  
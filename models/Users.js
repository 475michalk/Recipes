const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        match: /^[a-zA-Z0-9]*$/,
        // unique: true // אם ברצונך ששם המשתמש יהיה ייחודי
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
         match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // תבנית אימייל
    },
    address: {
        type: String,
        min: 3,
        max: 20
    },
    role: {
        type: String,
        enum: ["מנהל", "משתמש רשום"]
    }
});

module.exports = mongoose.model("Users", UserSchema);

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
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
          ],
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

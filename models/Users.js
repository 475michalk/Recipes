const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
        match: /^[a-zA-Z]/,
        // unique: true // אם ברצונך ששם המשתמש יהיה ייחודי
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        minLength:4,
        maxLength:16
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
        enum: ["Admin", "User"],
        default:"User"
    }
});

module.exports = mongoose.model("Users", UserSchema);

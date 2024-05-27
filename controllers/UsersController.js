const { userValidators, generateToken, User } = require("../models/Users");
const bcrypt = require("bcrypt");




exports.SignIn = async (req, res, next) => {
    const v = userValidators.login.validate(req.body);
    if (v.error) return next({ message: v.error.message });
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) return next(new Error(err.message));

            console.log(same);
            if (same) {
                const token = generateToken(user);
                user.password = "******";
                return res.send({ user, token });
            }
            return next({ message: "Auth Failed 1", status: 401 });
        });
    } else {
        return next({ message: "Auth Failed 2", status: 401 });
    }
};



exports.SignUp = async (req, res, next) => {
    const { nameUser, email, password, address, role } = req.body;

    try {
        // בדיקה אם המשתמש כבר קיים במסד הנתונים
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: { message: "User already exists" } });
        }

        // יצירת המשתמש אם הוא עדיין לא קיים
        const user = new User({ nameUser, email, password, address, role });
        await user.save();

        const token = generateToken(user);
        user.password = "****";
        return res.status(201).json({ user, token });
    } catch (error) {
        return next({ message: error.message, status: 500 });
    }
}


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-__v')
        return res.json(users);
    } catch (error) {
        next(error);
    }
}


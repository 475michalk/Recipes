const express=require("express");
const{
    getAllUsers,
    SignIn,
    SignUp
}=require("../controllers/UsersController");
const { isAdmin } = require("../middlewares/auth");

const router=express.Router();

router.post("/signIn",SignIn);
router.post("/signUp",SignUp);
router.get("/",getAllUsers);
//router.get("/",isAdmin,getAllUsers);

module.exports = router;
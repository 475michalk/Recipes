const {userValidators,generateToken, User}= require("../models/Users");
const bcrypt=require("bcrypt");
const Joi=require("joi");

exports.SignIn= async(req,res,next)=>{
    const v=userValidators.login.validate(req.body);
    if (v.error) 
        return next({message: v.error.massage})
    const{email,password}=req.body;

    const user=await User.findOne({email})
    if(user){
        bcrypt.compare(password,user.password, (err,same)=>{
            if(err)
                return next(new Error(err.message));
            if(same){
                const token=generateToken(user);
                user.password="****";
                return res.send({user,token});
            }
            return next({message:'Auth Failed', status:401})
        })
    }
    else{
        return next({message: 'Auth Failes', status:401})
    }
}

exports.SignUp=async(req,res,next)=>{

    const {nameUser, email, password,address,role}=req.body;
    const isValid=userValidators.login.validate({email,password});
    if(isValid.error){
        return next({message:isValid.error.message})
    }
    try{

    const user = new User({ username, email, password, address, role });
        await user.save();
        console.log(user);
        const token = generateToken(user);
        user.password = "****";
        return res.status(201).json({ user, token });
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }

}

exports.getAllUsers= async(req, res, next) =>{
    try {
        const users = await User.find().select('-__v')
        return res.json(users);
    } catch (error) {
        next(error);
    }
}
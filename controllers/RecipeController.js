const mongoose= require("mongoose");
const {Recipes}= require("../models/Recipes");


exports.getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipes.find().select('-__v');
        return res.json(recipes);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


exports.getRecipesById= (req,res,next)=>{
    const id= req.params.id;
    console.log(mongoose.Types.ObjectId.isValid(id));
    if(!mongoose.Types.ObjectId.isValid(id))
        next({message: 'id is not valid'})
    else{
        Recipes.findById(id,{__v: false})
        .then(c=>{
            res.json(c);
        })
        .catch(err=>{
            next({message:'recipe not found',status:404})
        })
    }
};

exports.addRecipes=async(req,res,next)=>{
    try{
    const r=new Recipes(req.body);
    await r.save();
    return res.status(201).json(r);
    }catch(error){
        next(error);
    }
};


exports.updateRecipe=async(req,res,next)=>{
    const id=req.params.id;
    if(!mongoose,mongoose.Types.ObjectId.isValid(id))
        next({message:'id is not valid'})
    try{
        const c = await Recipes.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true } 
        )
        return res.json(c);
    } catch (error) {
        next(error)
    }
};

exports.deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        try {
            if (!(await Recipes.findById(id)))
                return next({ message: 'course not found!!!', status: 404 })

            // אם קיים 
            await Recipes.findByIdAndDelete(id)
            return res.status(204).send();
        } catch (error) {
            return next(error)
        }
    }
};

exports.getRecipesById= (req,res,next)=>{
    const id= req.params.id;
    console.log(mongoose.Types.ObjectId.isValid(id));
    if(!mongoose.Types.ObjectId.isValid(id))
        next({message: 'id is not valid'})
    else{
        Recipes.findById(id,{__v: false})
        .then(c=>{
            res.json(c);
        })
        .catch(err=>{
            next({message:'recipe not found',status:404})
        })
    }
};

exports.addRecipes=async(req,res,next)=>{
    try{
    const r=new Recipes(req.body);
    await r.save();
    return res.status(201).json(r);
    }catch(error){
        next(error);
    }
};


exports.updateRecipe=async(req,res,next)=>{
    const id=req.params.id;
    if(!mongoose,mongoose.Types.ObjectId.isValid(id))
        next({message:'id is not valid'})
    try{
        const c = await Recipes.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true } 
        )
        return res.json(c);
    } catch (error) {
        next(error)
    }
};

exports.deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        try {
            if (!(await Recipes.findById(id)))
                return next({ message: 'course not found!!!', status: 404 })

            // אם קיים 
            await Recipes.findByIdAndDelete(id)
            return res.status(204).send();
        } catch (error) {
            return next(error)
        }
    }
};
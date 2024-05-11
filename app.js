const express=require("express");
const morgan = require("morgan");
const cors = require("cors");

const RecipeRouter = require("./routes/RecipesRoute");
const CategoryRouter = require("./routes/CategoryRoute");
const UserRouter = require("./routes/UsersRoute");
const { pageNotFound, serverNotFound } = require("./middlewares/hendleError");

require('dotenv').config();
require('./config/DB');


const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // req.body

app.use(morgan("dev"));//הדפסת המידע בכל בקשה

app.use(cors());//גישה לכל הכתובות


app.get('/',(req,res)=>{
    res.send('wellcome');
})
app.use("/User", UserRouter)
app.use("/recipe", RecipeRouter);
app.use("/category", CategoryRouter);

// אם הגענו לכאן - ניתוב לא קיים
app.use(pageNotFound);
app.use(serverNotFound);

const port=process.env.PORT;
app.listen(port, ()=>{
    console.log("running at http://localhost:" + port);
});

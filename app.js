const express=require("express");
const morgan = require("morgan");
const cors = require("cors");

require('dotenv').config();


const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // req.body

app.use(morgan("dev"));//הדפסת המידע בכל בקשה

app.use(cors());//גישה לכל הכתובות


app.get('/',(req,res)=>{
    res.send('wellcome');
})

const port=process.env.PORT;
app.listen(port, ()=>{
    console.log("running at http://localhost:" + port);
});

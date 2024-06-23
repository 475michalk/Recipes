const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const RecipeRouter = require("./routes/RecipesRoute");
const CategoryRouter = require("./routes/CategoryRoute");
const UserRouter = require("./routes/UsersRoute");
const { pageNotFound, serverNotFound } = require("./middlewares/hendleError");

require('dotenv').config();
require('./config/DB');

const fs = require("fs");
const path = require("path");
const app = express();

const imageDirectory = path.join(__dirname, 'uploads');
let imageIndex = 0;

app.use(cors()); // הוספת המידלוור של cors כאן

app.get('/recipe/nextImage', (req, res) => {
    fs.readdir(imageDirectory, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Error reading image directory' });
        } else {
            if (imageIndex >= files.length) {
                imageIndex = 0; // Reset index when all images have been sent
            }
            const imagePath = path.join(imageDirectory, files[imageIndex]);
            const imageUrl = `http://localhost:5000/images/${files[imageIndex]}`;
            res.json({ imageUrl: imageUrl });
            imageIndex++;
        }
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors()); // הוספת המידלוור של cors כאן

app.get('/', (req, res) => {
    res.send('wellcome');
});

app.use('/images', express.static('uploads'));

app.use("/user", UserRouter);
app.use("/recipe", RecipeRouter);
app.use("/category", CategoryRouter);

app.use(pageNotFound);
app.use(serverNotFound);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("running at http://localhost:" + port);
});

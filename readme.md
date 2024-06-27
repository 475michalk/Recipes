

# Server Recipe

## Installation

### Before starting the server, make sure to install the necessary Node.js modules:

### npm install


## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

| dotenv
| Variable     | Description                                                |
| ------------ | ---------------------------------------------------------- |
| DB_URL       | MongoDB connection URL for your database.                   |
| PORT         | Port number on which the server will run.                  |
| BCRYPT_SALT  | Number of salt rounds for bcrypt hashing.                   |
| JWT_SECRET   | Secret key used for signing JWT tokens.                    |



## Endpoints

### Users Resource

| URL                                      | Method | Description                    | Permissions     | Parameters          | Optional Parameters | Body                | Headers         | Returns | Status Codes |
| ---------------------------------------- | ------ | ------------------------------ | --------------- | ------------------- | ------------------- | ------------------- | --------------- | ------- | ------------ |
| [http://localhost:5000/user/signIn](http://localhost:5000/user/signIn) | POST   | User sign in|-|-|-|{email,password}|-|user+token| 204|
| [http://localhost:5000/user/signUp](http://localhost:5000/user/signUp) | POST   | User sign up|-|-|-|{username,email,password,addres}|-| User+token|204|
| [http://localhost:5000/user](http://localhost:5000/user)| GET    | Get all users| current user|-|-|-|all user      | 200           |
| [http://localhost:5000/user/getName](http://localhost:5000/user/getName) | GET    | Get all user names|only Manager|-|-|-| all user name|200 |

### Recipes Resource

| URL| Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| ------------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/recipe](http://localhost:5000/recipe) | GET    | Get all recipes | - |-| -| -               | -       |all recipes|200|
| [http://localhost:5000/recipe/allR](http://localhost:5000/recipe/allR) | GET    | Get all recipes|-| -|serach value ,start page ,num of page | -| -| all recipes by sorted| 200|
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | GET    | Get recipe by ID                 | - |*id*|-|-|-|recipe by *id*|200|
| [http://localhost:5000/recipe/recipeByUserId](http://localhost:5000/recipe/recipeByUserId) | GET    | Get recipes by user ID           | - |*id user*|-|-|-|recipe by *user id*|200|
| [http://localhost:5000/recipe/images](http://localhost:5000/recipe/images) | GET    | Get all images                   | -               |- | -                    | -                  | -               |  all images in upload|200|
| [http://localhost:5000/recipe/user/:userId](http://localhost:5000/recipe/user/:userId) | GET    |  return recipe by *user  id* | curren user | user id|-|-|token|recipe by *use id*|200|
| [http://localhost:5000/recipe](http://localhost:5000/recipe) | POST   | add recipe  |current user|-|-|{recipe}|token|new recipe added|204|
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | PUT    |   update existing reipe  (by *recipe id*) | curren user |*recipe id*|-|{new recipe}|token|return  updated recipe|204|
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | DELETE |   deleting existing reipe  (by *recipe id*) | curren user |*recipe id*|-|-|token|-|204|

### Categories Resource

| URL                                                              | Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| ---------------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/category](http://localhost:5000/category) | GET    | Get all categories             | everyone|-|-|-|all |all category|200|        
| [http://localhost:5000/category](http://localhost:5000/category) | POST   | Create new category              | -               |                     |                     |{name category}    | add a new categories in post Recipe   | -  | 204     |
| [http://localhost:5000/category/RecipesByCategory](http://localhost:5000/category/RecipesByCategory) | GET    | get all category with recipe| - |-|-|-|-|all category with recipe |200|
| [http://localhost:5000/category/:id](http://localhost:5000/category/:id) | GET    | get category by id with recipe| - |*id*|-|-|-|category by id with recipes |200|

### General Endpoints

| URL                                                       | Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| --------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/recipe/nextImage](http://localhost:5000/recipe/nextImage) | GET    | Get next image from uploads      | all users               | -| - | -                  | give all 3 second image to home page   | next image    | 200    |

```


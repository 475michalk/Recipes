כמובן! הנה קובץ README.md עם העיצוב והטבלאות בפורמט markdown, שתוכלי להעתיק או להוריד:

```markdown
# Server Recipe

## Installation

Before starting the server, make sure to install the necessary Node.js modules:

```sh
npm install
```

## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```dotenv
| Variable     | Description                                                |
| ------------ | ---------------------------------------------------------- |
| DB_URL       | MongoDB connection URL for your database.                   |
| PORT         | Port number on which the server will run.                  |
| BCRYPT_SALT  | Number of salt rounds for bcrypt hashing.                   |
| JWT_SECRET   | Secret key used for signing JWT tokens.                    |

```

## Endpoints

### Users Resource

| URL                                      | Method | Description                    | Permissions     | Parameters          | Optional Parameters | Body                | Headers         | Returns | Status Codes |
| ---------------------------------------- | ------ | ------------------------------ | --------------- | ------------------- | ------------------- | ------------------- | --------------- | ------- | ------------ |
| [http://localhost:5000/user/signIn](http://localhost:5000/user/signIn) | POST   | User sign in                   | -               |                     |                     | User credentials   | -               | -       | -            |
| [http://localhost:5000/user/signUp](http://localhost:5000/user/signUp) | POST   | User sign up                   | -               |                     |                     | User data          | -               | -       | -            |
| [http://localhost:5000/user](http://localhost:5000/user)                     | GET    | Get all users                  | -               |                     |                     | -                   | -               | -       | -            |
| [http://localhost:5000/user/getName](http://localhost:5000/user/getName) | GET    | Get all user names             | -               |                     |                     | -                   | -               | -       | -            |

### Recipes Resource

| URL                                                           | Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| ------------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/recipe](http://localhost:5000/recipe) | GET    | Get all recipes                  | -               |                     |                     | -                  | -               | -       | -            |
| [http://localhost:5000/recipe/allR](http://localhost:5000/recipe/allR) | GET    | Get all recipes (alternative endpoint) | -               |                     |                     | -                  | -               | -       | -            |
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | GET    | Get recipe by ID                 | -               | recipeId            |                     | -                  | -               | -       | -            |
| [http://localhost:5000/recipe/recipeByUserId](http://localhost:5000/recipe/recipeByUserId) | GET    | Get recipes by user ID           | Registered User | userId              |                     | -                  | -               | -       | -            |
| [http://localhost:5000/recipe/images](http://localhost:5000/recipe/images) | GET    | Get all images                   | -               |                     |                     | -                  | -               | -       | -            |
| [http://localhost:5000/recipe/user/:userId](http://localhost:5000/recipe/user/:userId) | GET    | Get recipes by user ID (alternative endpoint) | Registered User | userId              |                     | -                  | -               | -       | -            |
| [http://localhost:5000/recipe](http://localhost:5000/recipe) | POST   | Add new recipe                   | Registered User |                     |                     | Recipe data        | image (file)    | -       | -            |
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | PUT    | Update existing recipe by ID     | -               | recipeId            |                     | Updated recipe data| -               | -       | -            |
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | DELETE | Delete existing recipe by ID     | -               | recipeId            |                     | -                  | -               | -       | -            |

### Categories Resource

| URL                                                              | Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| ---------------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/category](http://localhost:5000/category) | GET    | Get all categories               | -               |                     |                     | -                  | -               | -       | -            |
| [http://localhost:5000/category](http://localhost:5000/category) | POST   | Create new category              | -               |                     |                     | Category data      | -               | -       | -            |
| [http://localhost:5000/category/RecipesByCategory](http://localhost:5000/category/RecipesByCategory) | GET    | Get all recipes by category      | -               |                     |                     | -                  | -               | -       | -            |
| [http://localhost:5000/category/:id](http://localhost:5000/category/:id) | GET    | Get category by ID               | -               | categoryId          |                     | -                  | -               | -       | -            |

### General Endpoints

| URL                                                       | Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| --------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/recipe/nextImage](http://localhost:5000/recipe/nextImage) | GET    | Get next image from uploads      | -               |                     |                     | -                  | -               | -       | -            |
| [http://localhost:5000](http://localhost:5000)                     | GET    | Welcome message                  | -               |                     |                     | -                  | -               | -       | -            |
```


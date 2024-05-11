const jwt=require("jsonwebtoken");


exports.isAdmin= async(req, res, next)=> {
    try {
        const { authorization } = req.headers;//extracting the token from the header
        console.log(authorization);
        const [, token] = authorization.split(' ');
        const privateKey = process.env.JWT_SECRET || 'JWT_SECRET'; // secret string by which the token was created

        const data = jwt.verify(token, privateKey);// the data that the token contains
        req.user = data;
        if (data.role == "admin")
            next(); // moving to Route/Middleware
        else
            next({ message: 'only admin can get all users', status: 403 });
    } catch (err) {
        console.log("error: "+err );
        next({ message: err, status: 401 });
    }
}

exports.isRegisteredUser= async(req, res, next) =>{
    try {
        const { authorization } = req.headers;
        const [, token] = authorization.split(' ');
        const key = process.env.JWT_SECRET || 'JWT_SECRET';
        const data = jwt.verify(token, key);
        req.user = data; //details who's create the token
        next();
    } catch (error) {
        next({ message: error, status: 401 })

    }
}
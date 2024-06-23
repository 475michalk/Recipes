const jwt = require("jsonwebtoken");

exports.isAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Authorization header is missing");
    const [, token] = authorization.split(' ');
    if (!token) throw new Error("Token is missing from authorization header");
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const data = jwt.verify(token, privateKey);
    req.user = data;
    if (data.role === "Manager") next();
    else next({ message: 'Only Manager can get all users', status: 403 });
  } catch (err) {
    console.log("error: " + err);
    next({ message: err.message, status: 401 });
  }
};

exports.isRegisteredUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Authorization header is missing");
    const [, token] = authorization.split(' ');
    if (!token) throw new Error("Token is missing from authorization header");
    const key = process.env.JWT_SECRET || 'JWT_SECRET';
    const data = jwt.verify(token, key);
    req.user = data;
    next();
  } catch (error) {
    console.log("Authentication error: " + error);
    next({ message: error.message, status: 401 });
  }
};

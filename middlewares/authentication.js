const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authentication = {};

authentication.loginRequired = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        console.log("tokenString",tokenString)
        if(!tokenString) throw new Error(401, "Login Required","Authentication Error");

        const token = tokenString.replace("Bearer ","");
        jwt.verify(token, JWT_SECRET_KEY,(err,payload) => {
            if(err) {
                if(err.name === "Token Expired Error") {
                    throw new Error(401,"Token Expired","Authentication Error");
                } else {
                    throw new Error(401,"Token is invalid","Authentication Error")
                }
            }

            req.userId = payload._id;
        });
        next();
    } catch(error) {
        next(error)
    };
};

module.exports = authentication;
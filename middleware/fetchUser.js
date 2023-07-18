const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Nishant@is$awesome";

const fetchUser = (req, res, next) => {
    // Get the user from jwt token and add it to the req object
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).json({
            error: "you are not authorized to access this end point."
        });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({
            error: "you are not authorized to access this end point."
        });   
    }
    
}

module.exports = fetchUser;
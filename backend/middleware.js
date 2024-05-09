const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg:"heyyo"});
    }

    const token = authHeader.split(' ')[1];
    // console.log(typeof token)
    // console.log(token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        req.userId = decoded.userId;

        next();
    } catch (err) {
        console.log("hey2")
        return res.status(403).json({message:"you aren't signed in"});
    }
};

module.exports =  authMiddleware
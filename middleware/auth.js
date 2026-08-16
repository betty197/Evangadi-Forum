const { StatusCodes } = require('http-status-codes');
const jwt = require("jsonwebtoken");
async function authMiddleware (req, res, next){
    const authHeader = req.headers.authorization
    console.log("Authorization Header:", authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authentication failed - no header"});
    }
    try {
         const token = authHeader.split(" ")[1];
         console.log("Extracted Token:", token)
         if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authentication failed - invalid token format"});
         }
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         console.log("Decoded Token:", decoded)
         req.customer = {username: decoded.username, customerid: decoded.customerid};
         next();
    } catch (error) {
        console.log("Auth Error:", error.message)
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authentication failed", error: error.message});
    }
}
module.exports = authMiddleware;
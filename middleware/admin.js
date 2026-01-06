const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET_ADMIN


function adminAuth(req,res,next){
    const token = req.headers.token;
    try{
        const verifyToken = jwt.verify(token, secret)
        req.id = verifyToken.userId;
        next();
        
    }
    catch(e){
        res.json({message:"some shit happened idk "})
        
    }
}
module.exports = {adminAuth}
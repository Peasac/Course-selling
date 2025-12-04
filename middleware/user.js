const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET

function userAuth(req,res,next){
    const token = req.headers.token;
    try{
        const verifyToken = jwt.verify(token, secret)
        req.id = verifyToken.userId;
        
    }
    catch(e){
        res.json({message:"some shit happened idk "})
        
    }
}

function adminAuth(req,res,next){
    const token = req.headers.token;
    try{
        const verifyToken = jwt.verify(token, secret)
        req.id = verifyToken.userId;
        
    }
    catch(e){
        res.json({message:"some shit happened idk "})
        
    }
}
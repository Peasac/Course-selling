const {Router} = require('express');
const userRouter = Router();
const {z} = require('zod');
const bcrypt = require("bcrypt")
const {userModel} = require("../db/index")
const jwt = require('jsonwebtoken');
require('dotenv').config;
const JWT_SECRET = process.env.JWT_SECRET_USER;
userRouter.post('/signup', async(req,res)=>{
    const requiredBody = z.object({
        firstName: z.string(),
        lastName:z.string(),
        email:z.email(),
        password:z.string().min(6).max(12)
    })
    try{
    const body = requiredBody.safeParse(req.body);
    if(!body.success){
        res.json({
            message:body.error
        })
        return
    }
    const {firstName, lastName, email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
        firstName, 
        lastName, 
        email,
        password:hashedPassword
    })
    res.json({
        message:"successfull"
    })
    
}
    catch(e){
        res.status(404).json({
            message:e.message
        })
    }
})

userRouter.post('/signin', async(req,res)=>{
   const {email, password} = req.body;
   try{
    const user = await userModel.findOne({email:email});

    if(user){
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({id:user._id}, JWT_SECRET);
            res.json({
                token:token
            })
        }
        else{
            res.status(404).json({
                message:"Password incorrect lel"
            })
        }
    }
    else{
        res.status(404).json({
            message:"User not found"
        })
    }
   }
   catch(e){
    res.status(404).json({
        message:e.message
    })
   }
})

userRouter.get('/purchases', async(req,res)=>{
    res.json({
        message:"these are your purchases"
    })
})
module.exports = {
    userRouter:userRouter
}
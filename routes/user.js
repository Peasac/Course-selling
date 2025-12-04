const {Router} = require('express');
const userRouter = Router();


userRouter.post('/signup', async(req,res)=>{
    res.json({
        message:"Signup successful"
    })
})

userRouter.post('/login', async(req,res)=>{
    res.json({
        message:"Login successful"
    })
})

userRouter.get('/purchases', async(req,res)=>{
    res.json({
        message:"these are your purchases"
    })
})
module.exports = {
    userRouter:userRouter
}
const {Router} = require('express');
const courseRouter = Router();


courseRouter.get('/preview', async(req,res)=>{
    res.json({
        message:"preview"
    })
})

courseRouter.post('/purchase', async(req,res)=>{
    res.json({
        message:"purchase successful"
    })
})

module.exports = {
    courseRouter:courseRouter
}
const {Router} = require('express');
const { purchasesModel, courseModel } = require('../db/index.js');
const { success } = require('zod');
const courseRouter = Router();
const { userAuth } = require('../middleware/user.js');

//All courses(visible to everyone)
courseRouter.get('/preview', async(req,res)=>{
    const courses = await courseModel.find({})
    res.json({
        courses:courses
    })
})
//purchasing a course
courseRouter.post('/purchase',userAuth, async(req,res)=>{
    const {userId,courseId} = req.body;
    await purchasesModel.create({
        userId,
        courseId
    })
    res.json({
        success:true,
        message:"purchase successful"
    })
})

module.exports = {
    courseRouter:courseRouter
}
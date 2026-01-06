const {Router} = require('express');
const adminRouter = Router();
const {z} = require("zod")
const bcrypt = require("bcrypt");
const {adminModel, courseModel} = require("../db/index")
const {adminAuth} = require('../middleware/admin')

require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET_ADMIN
adminRouter.post('/signup', async(req,res)=>{
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
    await adminModel.create({
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
adminRouter.post('/signin', async(req,res)=>{
   const {email, password} = req.body;
   try{
    const admin = await adminModel.findOne({email:email});
    
    if(admin){
        if(await bcrypt.compare(password, admin.password)){
        
            const token = jwt.sign({id:admin._id}, JWT_SECRET);
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

//admin creates a course
adminRouter.post('/course', adminAuth, async(req,res)=>{
    const adminId = req.id;
    try{
        const {title, description, price, imageUrl} = req.body;
        const course = await courseModel.create({
            title, 
            description,
            price,
            imageUrl,
            creatorId:adminId
        })
        res.json({
            message:"successfull",
            courseId:course._id,
            hi:"hiiii"
        })
    }
    catch(e){
        res.status(404).json({
            message:e.message
        })
    }
})

// updating a course
adminRouter.put('/course', adminAuth, async(req,res)=>{
    const adminId = req.id;
    try{
        const {title, description, price, imageUrl, courseId} = req.body;
        const course = await courseModel.updateOne({
            _id: courseId, 
            creatorId: adminId
        },{
            title, 
            description,
            price,
            imageUrl,
            creatorId:adminId
        })
        res.json({
            message:"successfull",
            course:course,
            courseID:course._id
        })
    }
    catch(e){
        res.status(404).json({
            message:e.message
        })
    }


})
//get all of his courses
adminRouter.get('/course/bulk', adminAuth, async(req,res)=>{
    const adminId = req.id;
    const courseId = req.body.courseId
    try{
       const admin= await courseModel.find({creatorId:adminId,_id:courseId});
       if(admin){
        res.json({
            courses:admin
        })
       }
       else{
        res.status(404).json({
            message:"some issue raa"
        })
       }
    }
    catch(e){
        res.status(404).json({
            message:e.message
        })
    }
})
module.exports = {
    adminRouter:adminRouter
}
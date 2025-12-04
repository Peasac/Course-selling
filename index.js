const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')

const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/courses");
const {adminRouter} = require("./routes/admin")
const app = express();
app.use(express.json())
const dbLink = process.env.MONGODB_URI
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminRouter)
const connect = async()=>{
    console.log("hi")
    await mongoose.connect(dbLink);
    app.listen(3000)
}
connect();
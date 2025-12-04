const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new schema({
    firstName:String,
    lastName:String,
    email:{type:String, unique:true},
    password:String

})
const adminSchema = new schema({
    firstName:String,
    lastName:String,
    email:{type:String, unique:true},
    password:String
})
const courseSchema = new schema({
    title:String,
    description:String,
    prince:Number, 
    imageUrl:String, 
    creatorId:ObjectId
})
const purchasesSchema = new schema({
    courseId:ObjectId,
    userId:ObjectId
})

const userModel = mongoose.model("user", userSchema)
const courseModel = mongoose.model( "course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchasesModel = mongoose.model("purchases", purchasesSchema)

module.exports = {
    userModel,
    courseModel,
    adminModel,
    purchasesModel
}
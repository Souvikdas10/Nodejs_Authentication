const mongoose=require('mongoose');
const Schema=mongoose.Schema
const userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:true,
    }
})

const Usermodel=new mongoose.model('User',userSchema);
module.exports=Usermodel
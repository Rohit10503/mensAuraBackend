const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    cPassword:String,
    mobile:String
});
module.exports=mongoose.model("users",userSchema);

//table ka naam 'users' hai
//schema 'userSchema' hai

const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema({
    productId:String,
    userId:String,
    quantity:Number


});
module.exports=mongoose.model("cart",cartSchema);
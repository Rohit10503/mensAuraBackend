const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    userid:String,
    name: String,
    img:String,
    price:String,
    company:String,
    date:String

});
module.exports=mongoose.model("orders",orderSchema);

//table ka naam 'products' hai
//schema 'productSchema' hai

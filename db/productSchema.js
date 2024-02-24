const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name: String,
    img:String,
    price:String,
    company:String,

});
module.exports=mongoose.model("products",productSchema);

//table ka naam 'products' hai
//schema 'productSchema' hai

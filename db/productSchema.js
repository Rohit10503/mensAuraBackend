const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    Brand: String,
    Title:String,
    selling_Price:Number,
    Price:Number,
    Discount:String,
    image_indices:Array,
    

});
module.exports=mongoose.model("products",productSchema);

//table ka naam 'products' hai
//schema 'productSchema' hai

const mongoose=require("mongoose");
  // mongoose.connect("mongodb://127.0.0.1:27017/clothedb");
  
mongoose.connect("mongodb+srv://rohitpandey10503:Rohit1234@cluster0.oknc0ab.mongodb.net/MensAura?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser:true,
 
    useUnifiedTopology:true,

    
}).then(()=>{
    console.log("Database is Connected");
}).catch((err)=>{
    console.log("Not connected",err)
})

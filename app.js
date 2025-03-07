const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');

//This is my main db
const Listing=require('./models/Listings.js');

//Connecting MongoDB
main().then((res)=>console.log("Database Connected"))
async function main(){
    let URL='mongodb://localhost:27017/WanderLust';
    await mongoose.connect(URL);

}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));


let port=8080;
app.listen(port,()=>{
    console.log("Server is running on port",port);
})


//All listings Route
app.get("/listings",async(req,res)=>{
    const listings=await Listing.find({});
    console.log(listings);
    res.render("index.ejs",{listings});
})
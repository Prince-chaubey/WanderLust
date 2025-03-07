const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
var methodOverride = require('method-override')

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
    res.render("index.ejs",{listings});
})
//Adding a new list in existing list
app.post("/listings/new",async(req,res)=>{
    let {title,description,image,price,location,country}=req.body;
    let toInsert={
        title,
        description,
        image,
        price,
        location,
        country
    }
    const newListing= await Listing.insertOne(toInsert);
    res.redirect("/listings");
})

//create a new Listing Route
app.get("/listings/new",(req,res)=>{
    res.render("new.ejs");
})

//Single Listing Route
app.get("/listings/:id",async(req,res)=>{
    let id=req.params.id;
    const listings=await Listing.findById(id);
    console.log(listings.image);
    res.render("List.ejs",{listings});
})
app.delete("/listing/:id",async(req,res)=>{
    let id=req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
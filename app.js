const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./Models/Listing.js");
const path=require("path");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);


const port=8080;

//Connected database 
const URL="mongodb://127.0.0.1:27017/wanderLust";
async function main(){
   await mongoose.connect(URL);
}
main().then(()=>{
    console.log("Database connected");
})
.catch((error)=>{
    console.log("error while connecting Database");
})

//Main Route or Home page
app.get("/",(req,res)=>{
    res.send("Hey I am root");
})

//Index Route
app.get("/listings",async(req,res)=>{
   const allListings=await Listing.find({});
   res.render("allListings.ejs",{allListings});
})

app.delete("/listings/:id",async(req,res)=>{
    const id=req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

//Rooute to edit the Listings
app.put("/listings/:id",async(req,res)=>{
    const id=req.params.id;
    const {title,description,image,price,location,country}=req.body;
    await Listing.findByIdAndUpdate(id,{title,description,image,price,location,country});
    res.redirect("/listings");
})

//Route to render the edit form

app.get("/listings/:id/edit",async(req,res)=>{
    const List=await Listing.findById(req.params.id);
    if(!List){
        return res.status(404).send("Listing not found");
    }
    res.render("edit.ejs",{List});

})

//Create a new Route
app.get("/listings/new",(req,res)=>{
    res.render("create.ejs");
    
})

//saving the route
app.post("/listings/new",async(req,res)=>{
    let {title,description,image,price,location,country}=req.body;
      
    await Listing.create({ title, description, image, price, location, country });

    res.redirect("/listings");
})

//Show Route
app.get("/listings/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        const list = await Listing.findById(id);
        if (!list) {
            return res.status(404).send("Listing not found");
        }
        res.render("show.ejs", { list });
    } catch (error) {
        console.error(error);
        res.status(400).send("Invalid Listing ID");
    }
})

//Listener on the port
app.listen(port,()=>{
    console.log("Server is running at the ",port);
})





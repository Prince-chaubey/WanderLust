const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./Models/Listing.js");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));


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
   res.render("index.ejs",{allListings});
})
//Create a new Route
app.get("/listings/new",(req,res)=>{
    res.render("create.ejs");
    
})

//saving the route
app.post(("/listings/new"),async(req,res)=>{
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





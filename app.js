const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride = require('method-override')
const ejsMate=require('ejs-mate');

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
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.use(express.json());


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
    res.render("List.ejs",{listings});
})
app.delete("/listings/:id",async(req,res)=>{
    let id=req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.put("/listings/:id",async(req,res)=>{
    try {
        let id = req.params.id;
        let { title, description, image, price, location, country } = req.body;

        // Update in MongoDB
        await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country });

        res.redirect(`/listings/${id}`); // Redirect to updated listing
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).send("Error updating listing");
    }
})

app.get('/listings/:id/edit', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('edit.ejs', { listing });
});


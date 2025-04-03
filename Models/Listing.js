//Exported Mongoose here
const mongoose=require("mongoose");

//Creating a Schema using Mongoose Schema

const Schema=mongoose.Schema;

//Defined Schema based on the Listing Requirments
const ListingSchema=new Schema({
    title:String,
    description:String,
    image:String,
    price:Number,
    location:String,
    country:String,
});
//Created a Model based on the Listing Schema
const Listing=mongoose.model("Listing",ListingSchema);

module.exports=Listing;
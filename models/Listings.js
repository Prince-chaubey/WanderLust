const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:String,
    description:String,
    image:{
        type:String,
        default:"https://source.unsplash.com/1600x900/?nature,water",
        get:(v)=>{
            v===""?"https://source.unsplash.com/1600x900/?nature,water":v;
        }
    },
    price:Number,
    location:String,
    country:String
})

const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;
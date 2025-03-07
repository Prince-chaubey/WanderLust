const mongoose=require('mongoose');
const Listings=require('../models/Listings');
const data=require('../intialize/data.js')


main().then((res)=>console.log("Database Connected"))
async function main(){
    let URL='mongodb://localhost:27017/WanderLust';
    await mongoose.connect(URL);
}


const insertData=async()=>{
    await Listings.deleteMany({});
    //now insert all the data's
    await Listings.insertMany(data.data);
    console.log("Data Inserted");
}

insertData();





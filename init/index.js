const mongoose = require("mongoose");
const initData = require("./init.js");
const Listing = require("../Models/Listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
async function main() {
    await mongoose.connect(MONGO_URL);
  }

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });



const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
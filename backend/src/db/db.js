//database connection

const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-view").then(()=>{
        console.log("Connected to MongoDB successfully");
    }).catch((err)=>{
        console.log("Failed to connect to MongoDB", err);
    })
}
module.exports = connectDB;
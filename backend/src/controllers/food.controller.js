const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4:uuid} = require("uuid")

async function createFood(req, res) {

    console.log("req.foodPartner: ",req.foodPartner);

    console.log("req.body: ",req.body);

    console.log("req.file: ",req.file)

    const fileUploadResult = await storageService.uploadFile(
        req.file.buffer,uuid() //+req.file.originalname
    );

    console.log("fileUploadResult: ",fileUploadResult);

    

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video:fileUploadResult.url,
        foodPartner: req.foodPartner._id
    }); 

    res.status(201).json({
        message: "Food item created successfully",
        food: foodItem,
        fileUploadResult:fileUploadResult
    });
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({

    })
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems: foodItems
    });
}

module.exports = {
    createFood,
    getFoodItems
}
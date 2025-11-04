const foodPartnerModel= require('../models/foodpartner.model');
const userModel= require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized access1"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if(!foodPartner){
            return  res.status(401).json({
                message: "Unauthorized access2"
            });
        }
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access3"
        });
    }   
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized access2"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized access4"
        });
    }
}



module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
};
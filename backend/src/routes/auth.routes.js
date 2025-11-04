const express = require('express');

const authController = require('../controllers/auth.controller');


const router = express.Router();


// User routes auth api
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);

// Food Partner routes auth api
router.post('/foodpartner/register', authController.registerFoodPartner);
router.post('/foodpartner/login', authController.loginFoodPartner);
router.post('/foodpartner/logout', authController.logoutFoodPartner);


module.exports = router;
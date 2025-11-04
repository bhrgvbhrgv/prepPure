const express = require('express');
const foodController = require('../controllers/food.controller');  
const authMiddleware = require('../middleware/auth.middleware'); 
const router = express.Router();
const multer = require('multer');

const upload = multer({ 
    storage: multer.memoryStorage(),
});

//post - /api/food/ [protected (normal user cantadd food items)],middleware to check food partner
router.post('/',
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"), 
    foodController.createFood);

//*get - /api/food/ [protected] (food video ka data to user)
router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
 );

module.exports = router;
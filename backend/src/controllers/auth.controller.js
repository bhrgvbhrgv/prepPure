const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        email
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "User already exists"
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token )

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

async function loginUser(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email
    })
    if (!user){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token )
    res.status(200).json({
        message: "User logged in successfully",
        user:{
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

async function registerFoodPartner(req,res){
    const { name, email, password, contactName, phone, address } = req.body;
    const isPartnerAlreadyExist = await foodPartnerModel.findOne({
        email
    })
    if(isPartnerAlreadyExist){
        return res.status(400).json({
            message: "Food Partner already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        contactName,
        phone,
        address
    });

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token )
    res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner:{   
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    });

}

async function loginFoodPartner(req,res){
    const {email,password} = req.body;
    const foodPartner = await foodPartnerModel.findOne({        
        email
    })
    if (!foodPartner){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token )
    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodPartner:{
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
    });
}   

async function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner logged out successfully"
    });
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}

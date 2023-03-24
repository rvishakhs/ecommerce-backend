const User = require("../modals/userModal")
const asynchandler = require("express-async-handler");
const generateToken = require("../config/jwttoken");

// Creating a new user 

const createuser =  asynchandler(async (req, res) => {
    const email = req.body.email
    const finduser = await User.findOne({email: email});

    if(!finduser) {
        // Create a new user
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        // user already exists
       throw new Error(`user already exists`)
    }
})

// Login user function

const loginuserctrl = asynchandler(async (req, res) => {
    const {email, password} = req.body
    // check the user exists or not
    
    const finduser = await User.findOne({email});

    if(finduser && await finduser.isPaasswordMatched(password)) {
        res.json({
            _id : finduser?._id,
            firstname : finduser?.firstname,
            lastname : finduser?.lastname,
            email: finduser?.email,
            mobile : finduser?.mobile,
            token : generateToken(finduser?._id)

        });
        console.log("Login Sucessfull");
    } else {
        throw new Error(`user not found`)
    }
}) 

//  Get all users 

const getallusers = asynchandler(async (req, res) => {
    const allUsers = await User.find() 
    res.json(allUsers)
} )

module.exports = {createuser, loginuserctrl, getallusers} 
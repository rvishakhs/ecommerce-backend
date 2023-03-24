const User = require("../modals/userModal")
const asynchandler = require("express-async-handler")

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

const loginuserctrl = asynchandler(async (req, res) => {
    const {email, password} = req.body
    // check the user exists or not
    
    const finduser = await User.findOne({email});

    if(finduser && await finduser.isPaasswordMatched(password)) {
        res.json(finduser);
        console.log("Login Sucessfull");
    } else {
        throw new Error(`user not found`)
    }


}) 

module.exports = {createuser, loginuserctrl} 
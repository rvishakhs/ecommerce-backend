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

module.exports = {createuser} 
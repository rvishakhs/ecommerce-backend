const User = require("../modals/userModal")

const createuser =  async (req, res) => {
    const email = req.body.email
    const finduser = await User.findOne({email: email});

    if(!finduser) {
        // Create a new user
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        // user already exists
        res.json({
            message: "User already exists",
            sucess : false
        })
    }
}

module.exports = {createuser}
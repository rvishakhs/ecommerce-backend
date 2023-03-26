const User = require("../modals/userModal")
const asynchandler = require("express-async-handler");
const generateToken = require("../config/jwttoken");
const MongoDbValidation = require("../utils/validatemogodbid");
var cookieParser = require('cookie-parser');
const generateRefreshToken = require("../config/refreshToken");

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
        const refreshToken = await generateRefreshToken(finduser?._id);
        const updateUser = await User.findByIdAndUpdate(finduser?._id, {
                refreshToken : refreshToken,
            },
            {
                new: true
            }
        )
        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
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
    try {
        const allUsers = await User.find() 
        res.json(allUsers)
    } catch (err) {
        throw new Error(err)
    }
} )

// Handlerefresh Token

const handleRefreshToken = asynchandler(async (req, res)=> {
    const cookie = req.cookies
    console.log(cookie);
})

// Find one user by Id

const getOneUser = asynchandler(async (req, res) => {
    const {_id} = req.user
    MongoDbValidation(_id)
    try {
        const user = await User.findById(_id)
        res.json(user)
    } catch (err) {
        throw new Error(err)
    }
})

// Find and delete a user 

const deleteUser = asynchandler(async (req, res) => {
    const {_id } = req.user
    MongoDbValidation(_id)
    try {
        const deletedUser = await User.findByIdAndDelete(_id)
        res.json(deletedUser)
    } catch (err) {
        throw new Error(err)
    }
}) 

// Find and update a user by id 

const updateUser = asynchandler(async (req, res) => {
    const {_id} = req.user 
    MongoDbValidation(_id)
    try {
        const UserUpdated = await User.findByIdAndUpdate(_id, {
            firstname : req?.body.firstname,
            lastname : req?.body.lastname,
            email : req?.body.email,
            mobile : req?.body.mobile
        },{new : true})
        res.json(UserUpdated)

    } catch (err) {
        throw new Error(err)
    }
})

// Block a user 

const blockUser = asynchandler(async (req, res) => {
    const {id} = req.params
    MongoDbValidation(id)
    try {
        const BlockedUser = await User.findByIdAndUpdate(id, {
            blocked : true
        }, {new : true})
        res.json({
            message : "User blocked"
        })
    } catch (err) {
        throw new Error("something wrong with blocked user")
    }
})

// Unblock User 
const unBlockUser = asynchandler(async (req, res) => {
    const {id} = req.params
    MongoDbValidation(id)
    try {
        const UnBlockedUser = await User.findByIdAndUpdate(id, {
            blocked : false
        }, {new : true})
        res.json({
            message : "User Unblocked"
        })
    } catch (err) {
        throw new Error("something wrong with unblocked user")
    }
})

module.exports = {
    createuser, 
    loginuserctrl, 
    getallusers, 
    getOneUser, 
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken
} 
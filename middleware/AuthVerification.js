const jwt = require("jsonwebtoken")
const User = require("../modals/userModal")
const asyncHandler = require("express-async-handler")

// Verifying jwt token to give access

const authHandler = asyncHandler(async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1]
        try {
           if(token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded?.id);
            if(user) {
                req.user = user;
                next();
            }
           }    
        } catch (err) {
            throw new Error(`There is an error with token or token expired more error details ${err.message}`)
        }

    } else {
        throw new Error("There is no authorization Is this the Error?")
    }
})

// Checking is the person login is admin or not?

const isAdmin = asyncHandler(async(req, res, next) => {
    const {email} = req.user
    const user = await User.findOne({ email: email})
    if(user.role === 'admin') {
        next()
    } else {
        res.status(401)
        throw new Error("You are not admin")
    }
})


module.exports = {authHandler, isAdmin}
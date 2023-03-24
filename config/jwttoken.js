const jwt = require("jsonwebtoken")

const generateToken = async (id) => {
    return await jwt.sign({id}, process.env.SECRET_KEY, {expiresIn : "3d"})
    
}

module.exports = {generateToken}
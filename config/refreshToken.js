const jwt = require("jsonwebtoken")

const generateRefreshToken = async (id) => {
     let token = await jwt.sign({id}, process.env.SECRET_KEY, { algorithm: 'HS256' ,expiresIn : "3d" })
     return token
}

module.exports = {generateRefreshToken}
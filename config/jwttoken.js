const jwt = require("jsonwebtoken")

const generateToken = async (id) => {
     let token = await jwt.sign({id}, process.env.SECRET_KEY, { algorithm: 'HS256' ,expiresIn : "31d" })
     return token
}

module.exports = {generateToken}
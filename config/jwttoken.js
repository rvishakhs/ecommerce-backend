const jwt = require("jsonwebtoken")

const generateToken =  (id) => {
     let token =  jwt.sign({id}, process.env.SECRET_KEY, { algorithm: 'HS256' ,expiresIn : "31d" })
     return token
}

module.exports = {generateToken}
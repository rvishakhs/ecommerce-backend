const bodyParser = require('body-parser')
const express = require('express')  // to import express
const dbconnection = require('./config/dbconnection')
const { notfound, errorhandler } = require('./middleware/errorhandler')
const app = express() // assigning express into a variable 
const dotenv = require('dotenv').config() // to enable dotenv we have to call dotenv module in node
const PORT = process.env.PORT || 4000 // assiging port
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")

dbconnection()


app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use("/api/user", authRoute) 
app.use("/api/product", productRoute) 

// For error handling

app.use(notfound)
app.use(errorhandler)


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})


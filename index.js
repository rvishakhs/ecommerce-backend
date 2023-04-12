const bodyParser = require('body-parser')
const express = require('express')  // to import express
const dbconnection = require('./config/dbconnection')
const { notfound, errorhandler } = require('./middleware/errorhandler')
const app = express() // assigning express into a variable 
const dotenv = require('dotenv').config() // to enable dotenv we have to call dotenv module in node
const PORT = process.env.PORT || 4000 // assiging port
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

// Different Routes
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")
const ProductCategoryRouter = require("./routes/productcategoryRoute")
const blogRouter = require("./routes/blogRoute")
const blogCategory = require("./routes/blogcategoryRoute")
const brandRoute = require("./routes/brandRoute")
const couponRoute = require("./routes/couponRoute")
const colorRoute = require("./routes/colorRoute")


dbconnection()


app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use("/api/user", authRoute) 
app.use("/api/product", productRoute) 
app.use("/api/category", ProductCategoryRouter) 
app.use("/api/blog", blogRouter) 
app.use("/api/blogcategory", blogCategory) 
app.use("/api/brand", brandRoute) 
app.use("/api/coupon", couponRoute) 
app.use("/api/color", colorRoute) 

// For error handling

app.use(notfound)
app.use(errorhandler)


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})


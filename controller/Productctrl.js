const Product = require("../modals/productModal")
const asynchandler = require("express-async-handler")

const createProduct = asynchandler(async(req, res) => {
    res.json({
        Message: "Product Created"
    })
})

module.exports = {createProduct}
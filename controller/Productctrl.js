const Product = require("../modals/productModal")
const asynchandler = require("express-async-handler")

const createProduct = asynchandler(async(req, res) => {
    try {
        const newproduct = await Product.create(req.body)
        res.json(newproduct)
    } catch (err) {
        throw new Error(err.Message)
    }
    
})

module.exports = {createProduct}
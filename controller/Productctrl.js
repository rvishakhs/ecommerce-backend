const Product = require("../modals/productModal")
const asynchandler = require("express-async-handler")

// Create a new product

const createProduct = asynchandler(async(req, res) => {
    try {
        const newproduct = await Product.create(req.body)
        res.json(newproduct)
    } catch (err) {
        throw new Error(`This error is related to creating product, and  details are ${err.Message}`)
    }   
})

// Find one Product 

const getproduct = asynchandler(async (req, res) => {
    const {id} = req.params
    
    try{
        const findproduct = await Product.findById(id)
        res.json(findproduct)
    } catch (err) {
        throw new Error(`This error is related to Find a product, and  details are ${err.Message}`)
    }

})

// Find all Product

const getAllProducts = asynchandler(async (req, res) => {
    try {
        const allproducts = await Product.find()
        res.json(allproducts)
    } catch (err){
        throw new Error(`This error is related to Finding all products, and  details are ${err.Message}`)
    }
})


module.exports = {createProduct, getproduct, getAllProducts}
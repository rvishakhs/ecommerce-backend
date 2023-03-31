const Product = require("../modals/productModal")
const asynchandler = require("express-async-handler")
const slugify = require('slugify')

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
        const queryobj =  {...req.query}
        const excludedfields = ["page", "sort", "limit", "fields"]
        excludedfields.forEach((item) => delete queryobj[item])

        // Filtering 

        let querystring = JSON.stringify(queryobj)
        console.log(querystring);

        querystring = querystring.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

        let query =  Product.find(JSON.parse(querystring))

        // Sorting 

        if(req.query.sort) {
            const Sortby = req.query.sort.split(",").join(" ")
            query = query.sort(Sortby)
        } else {
            query = query.sort("createdAt")
        }

        // Limiting the fields

        if(req.query.fields){
             const Fields = req.query.fields.split(",").join(" ")
             query = query.select(Fields)   
        } else {
            query = query.select("-__v")
        }

        // Pagination

        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit

        query = query.skip(skip).limit(limit)
        if(req.query.page ) {
            const totalproducts = await Product.countDocuments();
            console.log(totalproducts);
            if(skip >= totalproducts) throw new Error("This page does not exists")
        }

        console.log(page, limit, skip);
        
        const allproducts = await query
        res.json(allproducts)
    } catch (err){
        throw new Error(`This error is related to Finding all products, and  details are ${err.Message}`)
    }
})

// Update Product

const updateProduct = asynchandler(async (req, res) => {
    const {id } = req.params
    try {
        if(req.body.tittle) {
            req.body.slug = await slugify(req.body.tittle)
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.json(updatedProduct)

    } catch (err) {
        throw new Error(`This error is related to Updating products, and  details are ${err.Message}`)
    }
})

// Delate Product

const deleteProduct = asynchandler(async (req, res) => {
    const {id} = req.params
    try{
        const deletedProduct = await Product.findByIdAndDelete(id)
        res.json(deletedProduct)
    } catch (err) {
        throw new Error(`This error is related to Deleting product, and  details are ${err.Message}`)
    }
})


module.exports = {createProduct, getproduct, getAllProducts, updateProduct, deleteProduct}
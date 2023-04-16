const Product = require("../modals/productModal")
const asynchandler = require("express-async-handler")
const slugify = require('slugify')
const User = require("../modals/userModal")
const MongoDbValidation = require("../utils/validatemogodbid")

const fs = require ("fs")
// Create a new product

const createProduct = asynchandler(async(req, res) => {
    try {
        let values = req?.body
        values["slug"] = await slugify(req.body.tittle)
        const newproduct = await Product.create(values)
        
        res.json(newproduct)
    } catch (err) {
        throw new Error(`This error is related to creating product, and  details are ${err}`)
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
            if(skip >= totalproducts) throw new Error(`This page does not exists for more details check ${Error}`)
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

// Wishlist Functionality for products

const wishlistFunc = asynchandler(async (req, res) => {

    // Taking basing details such as userid and productid 
    const {_id} = req.user
    const {productid} =req.body 
    try {
        // Finding User
        const user = await User.findById(_id)
        // Finding is the product already added to wishlist
        let isalreadyadded = await user.wishlist.find((id)=> id.toString() === productid.toString());
        console.log(isalreadyadded);
        if(isalreadyadded){
            const product = await User.findByIdAndUpdate(_id, {$pull :{wishlist: productid}} , {new : true})
            res.json(product)
        } else {
            const product = await User.findByIdAndUpdate(_id, {$push :{wishlist: productid}} , {new : true})
            res.json(product)
        }

    } catch (err) {
        throw new Error (`This error is related to wishlist functionality`)
    }
})

// Product Rating functionality

const ratingfunction = asynchandler(async (req, res) => {
    // Getting basic things like user and product id 

    const {_id} = req.user;

    const {star, prodId, comment} = req.body;
    try{
        // Find the User
        const user = await User.findById(_id)
        // Find the product
        const product = await Product.findById(prodId)
        // Check the user already rated or not 
        const alreadyrated = await product.rating.find((userId) => userId.PostedBy.toString() === _id.toString())
        console.log(alreadyrated);
        // Condition
        if(alreadyrated) {
            const updaterating = await Product.updateOne(
                {rating : {$elemMatch : alreadyrated},}, {$set : {"rating.$.star": star ,"rating.$.comment": comment }}, {new : true}
                )
            res.json(updaterating)
        } else {
            const rateproduct = await Product.findByIdAndUpdate(prodId, {$push : {rating : {star : star , comment : comment,  PostedBy : _id}}}, {new : true})
            res.json(rateproduct)
        }

        // Calculate totalratings 

        const getallproductratings = await Product.findById(prodId)
        let sumofallratings = getallproductratings.rating.length;
        let ratingsum = getallproductratings.rating.map((item) => item.star).reduce((prev, current) => prev + current, 0)

        let actualrating = Math.round(ratingsum /sumofallratings)

        const totalratings = await Product.findByIdAndUpdate(prodId, {
            totalrating : actualrating
        })

        res.json(totalratings)

    }
    catch (err) {
        throw new Error (`This error is related to rating functionality`)
    }
 })




module.exports = {createProduct, getproduct, getAllProducts, updateProduct, deleteProduct, wishlistFunc, ratingfunction,}
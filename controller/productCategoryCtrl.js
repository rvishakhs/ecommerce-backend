const ProductCategory = require("../modals/productCategoryModal")
const asynchandler = require("express-async-handler")
const MongoDbValidation = require("../utils/validatemogodbid");

// Create category

const createcategory = asynchandler(async (req,res) => {
    try {
        const createdcategory = await ProductCategory.create(req.body)
        res.json(createdcategory)

    } catch (err) {
        throw new Error(`This error is related to create a new category for more details ${err.message}`)
    }
})

// Update category  
const updatecategory = asynchandler(async (req,res) => {
    const {id} = req.params
    try {
        const updatedcategory = await ProductCategory.findByIdAndUpdate(id, req.body ,{new : true})
        res.json(updatedcategory)

    } catch (err) {
        throw new Error(`This error is related to updating existing category for more details ${err.message}`)
    }
})

// Delete category
const deletecategory = asynchandler(async (req,res) => {
    const {id} = req.params
    try {
        const deletedcategory = await ProductCategory.findByIdAndDelete(id)
        res.json(deletecategory)

    } catch (err) {
        throw new Error(`This error is related to updating existing category for more details ${err.message}`)
    }
})


module.exports = {createcategory, updatecategory}

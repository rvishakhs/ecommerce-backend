const ProductCategory = require("../modals/productCategoryModal")
const asynchandler = require("express-async-handler")
const MongoDbValidation = require("../utils/validatemogodbid");

const createcategory = asynchandler(async (req,res) => {
    try {
        const createdcategory = await ProductCategory.create(req.body)
        res.json(createdcategory)

    } catch (err) {
        throw new Error(`This error is related to create a new category for more details ${err.message}`)
    }

})

module.exports = {createcategory}

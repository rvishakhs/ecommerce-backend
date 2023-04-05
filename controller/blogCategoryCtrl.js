const BlogCategory = require("../modals/blogCategoryModal")
const asynchandler = require("express-async-handler")

// Creating new blog category

const createBlogCategory = asynchandler(async (req, res)=> {
   try{
        const createcategory = await BlogCategory.create(req.body)
        res.json(createcategory)

   } catch (err) {
        throw new Error (`This error occured while creating a new blog category, For more info ${err.message}`)
   }
})

// Updating Existing blog category

const updateBlogCategory = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const updatecategory = await BlogCategory.findByIdAndUpdate(id , req.body, {new : true})
         res.json(updatecategory)
 
    } catch (err) {
         throw new Error (`This error occured while Updating a blog category, For more info ${err.message}`)
    }
 })

//  Delete existing blog category

const deleteBlogCategory = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const deletecategory = await BlogCategory.findByIdAndDelete(id)
         res.json(deletecategory)
 
    } catch (err) {
         throw new Error (`This error occured while deleting a blog category, For more info ${err.message}`)
    }
 })

//  Get one blog category

const getSingleBlogCategory = asynchandler(async(req, res)=> {
    const {id} = req.params;
    try {
        const singleblogcategory = await BlogCategory.findById(id)
        res.json(singleblogcategory)

    } catch (err) {
        throw new Error (`This error occured while geting a blog category, For more info ${err.message}`)
   }
});

// Get all blog categories

const getAllBlogCategories = asynchandler(async(req, res)=> {
    try {
        const allblogcategory = await BlogCategory.find()
        res.json(allblogcategory)

    } catch (err) {
        throw new Error (`This error occured while geting a blog category, For more info ${err.message}`)
   }
});



module.exports = {createBlogCategory, updateBlogCategory, deleteBlogCategory, getSingleBlogCategory, getAllBlogCategories}
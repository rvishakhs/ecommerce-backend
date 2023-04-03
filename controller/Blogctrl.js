const Blog = require("../modals/blogModal")
const User = require("../modals/userModal")
const asynchandler = require("express-async-handler")



// Create a new blog
const createBlog = asynchandler(async (req, res) => {
    try{
        const newBlog = await Blog.create(req.body)
        res.json({
            status : 200,
            newBlog
        })
    }catch (err) {
        throw new Error(`This error is related to creating blog post for more details : ${err.message}`)
    }
})

// Update Existing Blog

const updateBlog = asynchandler(async (req, res) => {
    const {id} = req.params;
    try{
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new : true,
        })
        res.json(updateBlog)
    } catch (err) {
        throw new Error(`This error is related to updating blog post for more details : ${err.message}`)
    }
})

// For viewing one Blog

const viewSingleBlog = asynchandler(async (req, res) => {
    const {id} = req.params;
    try{
        const ViewBlog = await Blog.findById(id)
        const updateViews = await Blog.findByIdAndUpdate(id, {
            $inc : {numOfViews : 1},
        }, {
            new : true,
        })
        res.json(updateViews)
    } catch (err) {
        throw new Error(`This error is related to updating blog post for more details : ${err.message}`)
    }
    
})

module.exports = {createBlog, updateBlog, viewSingleBlog}

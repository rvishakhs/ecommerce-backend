const Blog = require("../modals/blogModal")
const User = require("../modals/userModal")
const asynchandler = require("express-async-handler")
const MongoDbValidation = require("../utils/validatemogodbid")



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
        throw new Error(`This error is related to Viewing single blog post for more details : ${err.message}`)
    }
    
})

// Get all blogs 

const getAllBlogs = asynchandler(async (req, res) => {
    try {
        const allBlogs = await Blog.find()
        res.json(allBlogs)
    } catch (err){
        throw new Error(`This error is related to viewing all blog posts, for more details : ${err.message}`)
    }

})

// Delete a single blogpost 

const deleteBlog = asynchandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deletedblog = await Blog.findByIdAndDelete(id)
        res.json(deletedblog)

    } catch (err) {
        throw new Error(`This error is related to deleting single post, for more details : ${err.message}`)
    }
})

// Likefunctionality 

const likeBlog = asynchandler(async(req, res)=> {
    const {blogid} = req.body
    try {
        // Find the blog you want to be liked
        const blog = await Blog.findById(blogid)
        // Find the user who liked the blog
        const user = req?.user?._id
        // Find the user already liked the blog
        const isliked = blog?.isLiked
        // Finding user already disliked the post
        const disliked = blog?.disLikes?.find(
            (userId) => userId?.toString() === user.toString()
        );
        if(disliked){
            const blog = await Blog.findByIdAndUpdate(blogid, {$pull:{disLikes : user}, isDisLiked : false}, {new : true}) 
            res.json(blog)
        } 
        if(isliked ) {
            const blog = await Blog.findByIdAndUpdate(blogid,  {$pull : {likes: user }, isLiked : false}, {new : true})
            res.json(blog)
        } 
        else {
            const blog = await Blog.findByIdAndUpdate(blogid, {$push : {likes: user }, isLiked : true}, {new : true})
            res.json(blog)
        } 

    } catch (err) {
        throw new Error(`This error is related to likes , for more details : ${err.message}`)
    }
})

// Dislike Functionality 

const disLikeBlog = asynchandler(async(req,res)=> {
    // Take the blog id from body
     const {blogid} = req.body
    try {
    // Find out the blog using blog id
    const blog = await Blog.findById(blogid)
    // Find the user and store user id
    const user = req?.user?._id
    // Check user already disliked the vlog 
    const isDisLiked = await blog?.isDisLiked
    // Find user liked the blog 
    const liked = blog?.ikes?.find(
        (userId) => userId?.toString() === user.toString()
    );
    if(liked){
        const blog = await Blog.findByIdAndUpdate(blogid, {$pull:{likes : user}, isLiked : false}, {new : true}) 
        res.json(blog)
    }
    if(isDisLiked ) {
        const blog = await Blog.findByIdAndUpdate(blogid,  {$pull : {disLikes: user }, isDisLiked : false}, {new : true})
        res.json(blog)
    } 
    else {
        const blog = await Blog.findByIdAndUpdate(blogid, {$push : {disLikes: user }, isDisLiked : true}, {new : true})
        res.json(blog)
    }

    } catch (err) {
        throw new Error(`This error is related to dislikes, for more details : ${err.message}`)
    }
})

module.exports = {createBlog, updateBlog, viewSingleBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog}

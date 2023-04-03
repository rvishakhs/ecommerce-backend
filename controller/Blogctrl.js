const Blog = require("../modals/blogModal")
const User = require("../modals/userModal")
const asynchandler = require("express-async-handler")


const createBlog = asynchandler(async (req, res) => {
    try{
        const blog = await Blog.create(req.body)
        res.json({
            status : 200,
            blog
        })
    }catch (err) {
        throw new Error(`This error is related to creating blog post for more details : ${err.message}`)
    }

})

module.exports = {createBlog}

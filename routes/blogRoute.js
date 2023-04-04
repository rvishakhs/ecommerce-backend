const express = require('express')
const  {createBlog, updateBlog, viewSingleBlog, getAllBlogs, deleteBlog, likeBlog}  = require('../controller/Blogctrl')
const { authHandler, isAdmin } = require('../middleware/AuthVerification')

const router = express.Router()

router.post("/createblog", authHandler, isAdmin, createBlog)
router.put("/updateblog/:id", authHandler, isAdmin, updateBlog)
router.get("/", getAllBlogs)
router.put("/likes", authHandler, likeBlog)
router.get("/:id", viewSingleBlog)
router.delete("/:id",authHandler,isAdmin, deleteBlog)

module.exports = router 
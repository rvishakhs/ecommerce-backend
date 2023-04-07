const express = require('express')
const  {createBlog, updateBlog, viewSingleBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog, ImageUpload}  = require('../controller/Blogctrl')
const { authHandler, isAdmin } = require('../middleware/AuthVerification')
const { uploadPhoto, blogImgResize } = require('../middleware/imageupload')

const router = express.Router()

router.post("/createblog", authHandler, isAdmin, createBlog)
router.put("/updateblog/:id", authHandler, isAdmin, updateBlog)
router.put("/upload/:id",authHandler,isAdmin, uploadPhoto.array("images", 10) , blogImgResize, ImageUpload)
router.get("/", getAllBlogs)
router.put("/likes", authHandler, likeBlog)
router.put("/dislikes", authHandler, disLikeBlog)
router.get("/:id", viewSingleBlog)
router.delete("/:id",authHandler,isAdmin, deleteBlog)

module.exports = router 
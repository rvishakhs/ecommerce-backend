const express = require('express');
const { createBlogCategory, updateBlogCategory, deleteBlogCategory, getSingleBlogCategory, getAllBlogCategories } = require('../controller/blogCategoryCtrl');
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router();

router.post("/", authHandler, isAdmin, createBlogCategory)
router.put("/:id", authHandler, isAdmin, updateBlogCategory)
router.get("/:id" , getSingleBlogCategory)
router.get("/" , getAllBlogCategories)
router.delete("/:id", authHandler, isAdmin, deleteBlogCategory)

module.exports = router
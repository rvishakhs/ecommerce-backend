const express = require('express')
const  {createBlog, updateBlog, viewSingleBlog}  = require('../controller/Blogctrl')
const { authHandler, isAdmin } = require('../middleware/AuthVerification')

const router = express.Router()

router.post("/createblog", authHandler, isAdmin, createBlog)
router.put("/updateblog/:id", authHandler, isAdmin, updateBlog)
router.get("/:id", viewSingleBlog)

module.exports = router
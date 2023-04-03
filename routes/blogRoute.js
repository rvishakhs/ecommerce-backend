const express = require('express')
const  {createBlog}  = require('../controller/Blogctrl')
const { authHandler, isAdmin } = require('../middleware/AuthVerification')

const router = express.Router()

router.post("/", createBlog)

module.exports = router
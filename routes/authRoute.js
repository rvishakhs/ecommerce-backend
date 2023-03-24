
const express = require('express')
const { createuser } = require('../controller/userctrl')

const router = express.Router()


router.post("/register", createuser)

module.exports = router

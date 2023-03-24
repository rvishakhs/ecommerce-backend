
const express = require('express')
const { createuser, loginuserctrl } = require('../controller/userctrl')

const router = express.Router()


router.post("/register", createuser)
router.post("/login", loginuserctrl)

module.exports = router
 
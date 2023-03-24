
const express = require('express')
const { createuser, loginuserctrl, getallusers } = require('../controller/userctrl')

const router = express.Router()


router.post("/register", createuser)
router.post("/login", loginuserctrl)
router.get("/users", getallusers)


module.exports = router

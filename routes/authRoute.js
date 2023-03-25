
const express = require('express')
const { createuser, loginuserctrl, getallusers, getOneUser, deleteUser, updateUser } = require('../controller/userctrl')
const {authHandler, isAdmin} = require('../middleware/AuthVerification')


const router = express.Router()


router.post("/register", createuser)
router.post("/login", loginuserctrl)
router.get("/users", getallusers)
router.get("/:id", authHandler ,isAdmin, getOneUser)
router.delete("/:id", deleteUser)
router.put("/userupdate",authHandler, updateUser)



module.exports = router

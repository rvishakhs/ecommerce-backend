
const express = require('express')
const { createuser, loginuserctrl, getallusers, getOneUser, deleteUser, updateUser } = require('../controller/userctrl')

const router = express.Router()


router.post("/register", createuser)
router.post("/login", loginuserctrl)
router.get("/users", getallusers)
router.get("/:id", getOneUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)



module.exports = router
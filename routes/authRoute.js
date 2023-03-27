
const express = require('express')
const { createuser, loginuserctrl, getallusers, getOneUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken } = require('../controller/userctrl')
const {authHandler, isAdmin} = require('../middleware/AuthVerification')


const router = express.Router()


router.post("/register", createuser)
router.post("/login", loginuserctrl)
router.get("/users", getallusers)
router.get("/refresh", handleRefreshToken)
router.get("/:id", authHandler ,isAdmin, getOneUser)
router.delete("/:id", deleteUser)
router.put("/userupdate",authHandler, updateUser)
router.put("/blockuser/:id",authHandler,isAdmin, blockUser)
router.put("/unblockuser/:id",authHandler,isAdmin, unBlockUser)



module.exports = router

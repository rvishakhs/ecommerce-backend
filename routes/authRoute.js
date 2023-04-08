
const express = require('express')
const { createuser, loginuserctrl, getallusers, getOneUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken, logoutFunction, changePassword, forgetpassword, resetpassword, loginAdmin, wishlist, saveAddress, userCart, getUserCart, emptyCart } = require('../controller/userctrl')
const {authHandler, isAdmin} = require('../middleware/AuthVerification')


const router = express.Router()


router.post("/register", createuser)
router.post("/login", loginuserctrl)
router.post("/admin-login", loginAdmin)
router.put("/changepassword",authHandler, changePassword)
router.put("/address",authHandler, saveAddress)
router.post("/cart",authHandler, userCart)
router.get("/wishlist", authHandler, wishlist)
router.post("/forgetpassword", forgetpassword)
router.put("/resetpassword/:token", resetpassword)
router.get("/users", getallusers)
router.get("/usercart",authHandler, getUserCart)
router.delete("/emptycart",authHandler,  emptyCart)
router.get("/refresh", handleRefreshToken)
router.get("/logout", logoutFunction)
router.get("/:id", authHandler ,isAdmin, getOneUser)
router.delete("/:id", deleteUser)
router.put("/userupdate",authHandler, updateUser)
router.put("/blockuser/:id",authHandler,isAdmin, blockUser)
router.put("/unblockuser/:id",authHandler,isAdmin, unBlockUser)



module.exports = router

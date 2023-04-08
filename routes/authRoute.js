
const express = require('express')
const { createuser, loginuserctrl, getallusers, getOneUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken, logoutFunction, changePassword, forgetpassword, resetpassword, loginAdmin, wishlist, saveAddress, userCart, getUserCart, emptyCart, ApplyingCoupon, createOrder, getOrder, getallorders } = require('../controller/userctrl')
const {authHandler, isAdmin} = require('../middleware/AuthVerification')


const router = express.Router()


router.post("/register", createuser)  // register user
router.post("/login", loginuserctrl)  // login user
router.post("/admin-login", loginAdmin) // Admin login
router.put("/changepassword",authHandler, changePassword)  // change password
router.put("/address",authHandler, saveAddress)  // save address
router.post("/cart",authHandler, userCart)   // user cart
router.get("/wishlist", authHandler, wishlist) // wishlist
router.post("/forgetpassword", forgetpassword)  // forget password
router.put("/resetpassword/:token", resetpassword)  //reset password 
router.get("/users", getallusers)  // finding all users
router.get("/user-orders",authHandler, getOrder) // finding all orders of user
router.get("/allorders",authHandler,isAdmin, getallorders) // finding all orders of user
router.get("/usercart",authHandler, getUserCart) // usercart details 
router.post("/coupon-discount",authHandler, ApplyingCoupon)  // coupon discount
router.post("/order-create",authHandler, createOrder) // creating order
router.delete("/emptycart",authHandler,  emptyCart) // deleting or empty cart
router.get("/refresh", handleRefreshToken)  // refresh token
router.get("/logout", logoutFunction)  // logging out user
router.get("/:id", authHandler ,isAdmin, getOneUser) // get one user
router.delete("/:id",authHandler, isAdmin, deleteUser)   // delete user
router.put("/userupdate",authHandler, updateUser) // update user
router.put("/blockuser/:id",authHandler,isAdmin, blockUser)  // block user
router.put("/unblockuser/:id",authHandler,isAdmin, unBlockUser) // unblock user



module.exports = router

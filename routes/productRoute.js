const express = require('express');
const { createProduct, getproduct, getAllProducts, updateProduct, deleteProduct, wishlistFunc, ratingfunction, } = require('../controller/Productctrl');
const router = express.Router();

const {authHandler, isAdmin} = require('../middleware/AuthVerification');

router.post("/create",authHandler, isAdmin, createProduct)
router.put("/rating", authHandler, ratingfunction)
router.put("/:id",authHandler,isAdmin, updateProduct)
router.delete("/:id",authHandler,isAdmin, deleteProduct)
router.get("/:id", getproduct)
router.get("/", getAllProducts)
router.put("/", authHandler, wishlistFunc)


module.exports = router
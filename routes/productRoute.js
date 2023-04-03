const express = require('express');
const { createProduct, getproduct, getAllProducts, updateProduct, deleteProduct } = require('../controller/Productctrl');
const router = express.Router();

const {authHandler, isAdmin} = require('../middleware/AuthVerification')

router.post("/",authHandler, isAdmin, createProduct)
router.put("/:id",authHandler,isAdmin, updateProduct)
router.delete("/:id",authHandler,isAdmin, deleteProduct)
router.get("/:id", getproduct)
router.get("/", getAllProducts)


module.exports = router
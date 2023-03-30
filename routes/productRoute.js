const express = require('express');
const { createProduct, getproduct, getAllProducts, updateProduct } = require('../controller/Productctrl');
const router = express.Router();

router.post("/", createProduct)
router.get("/:id", getproduct)
router.put("/:id", updateProduct)
router.get("/", getAllProducts)


module.exports = router
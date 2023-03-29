const express = require('express');
const { createProduct, getproduct, getAllProducts } = require('../controller/Productctrl');
const router = express.Router();

router.post("/", createProduct)
router.get("/:id", getproduct)
router.get("/", getAllProducts)


module.exports = router
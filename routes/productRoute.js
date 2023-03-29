const express = require('express');
const { createProduct } = require('../controller/Productctrl');
const router = express.Router();

router.post("/", createProduct)


module.exports = router
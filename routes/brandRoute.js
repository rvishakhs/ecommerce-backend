const express = require('express');
const { createBrand, updateBrand, getSingleBrand, getAllBrands, deleteBrand } = require('../controller/brandControler');
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router();

router.post("/", authHandler, isAdmin, createBrand)
router.put("/:id", authHandler, isAdmin, updateBrand)
router.get("/:id" , getSingleBrand)
router.get("/" , getAllBrands)
router.delete("/:id", authHandler, isAdmin, deleteBrand)

module.exports = router
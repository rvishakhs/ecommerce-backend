const express = require("express")
const { createcategory, updatecategory } = require("../controller/productCategoryCtrl")
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router()

router.post("/", authHandler, isAdmin, createcategory)
router.put("/update/:id", authHandler, isAdmin, updatecategory)


module.exports = router
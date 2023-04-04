const express = require("express")
const { createcategory } = require("../controller/productCategoryCtrl")
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router()

router.post("/", authHandler, isAdmin, createcategory)


module.exports = router
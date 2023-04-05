const express = require("express")
const { createcategory, updatecategory, deletecategory, getOneCategory, getallCategory } = require("../controller/productCategoryCtrl")
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router()

router.post("/", authHandler, isAdmin, createcategory)
router.put("/update/:id", authHandler, isAdmin, updatecategory)
router.get("/:id", getOneCategory)
router.get("/", getallCategory)
router.delete("/delete/:id", authHandler, isAdmin, deletecategory)


module.exports = router
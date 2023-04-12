const express = require('express');
const { createProduct, getproduct, getAllProducts, updateProduct, deleteProduct, wishlistFunc, ratingfunction, ImageUpload, ImageDelete } = require('../controller/Productctrl');
const router = express.Router();

const {authHandler, isAdmin} = require('../middleware/AuthVerification');
const { uploadPhoto, productImgResize } = require('../middleware/imageupload');

router.post("/",authHandler, isAdmin, createProduct)
router.put("/rating", authHandler, ratingfunction)
router.put("/:id",authHandler,isAdmin, updateProduct)
router.put("/upload/:id",authHandler,isAdmin, uploadPhoto.array("images", 10) , productImgResize, ImageUpload)
router.delete("/delete/:id",authHandler, isAdmin, ImageDelete )
router.delete("/:id",authHandler,isAdmin, deleteProduct)
router.get("/:id", getproduct)
router.get("/", getAllProducts)
router.put("/", authHandler, wishlistFunc)


module.exports = router
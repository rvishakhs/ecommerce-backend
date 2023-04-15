const express = require('express');
const router = express.Router();

const {authHandler, isAdmin} = require('../middleware/AuthVerification');
const { uploadPhoto, productImgResize } = require('../middleware/imageupload');
const { ImageUpload, ImageDelete } = require('../controller/imguploadCtrl');

router.post("/",authHandler,isAdmin, uploadPhoto.array("images", 10) , productImgResize, ImageUpload)
router.delete("/:id",authHandler, isAdmin, ImageDelete )


module.exports = router
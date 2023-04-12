const express = require('express');
const {  updatecolor, getAllcolors, deletecolor, createColor } = require('../controller/colorCtrl');
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router();

router.post("/", authHandler, createColor)
router.put("/:id", authHandler, updatecolor)
router.get("/:id" , getAllcolors)
router.get("/" , getAllcolors)
router.delete("/:id", authHandler, deletecolor)

module.exports = router
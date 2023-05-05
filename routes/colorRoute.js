const express = require('express');
const {  updatecolor, getAllcolors, deletecolor, createColor, getSinglecolor } = require('../controller/colorCtrl');
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router();

router.post("/", authHandler, createColor)
router.put("/:id", authHandler, updatecolor)
router.get("/:id" , getSinglecolor)
router.get("/" , getAllcolors)
router.delete("/:id", authHandler, deletecolor)

module.exports = router
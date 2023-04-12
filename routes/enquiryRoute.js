const express = require('express');
const { createenquiry, updateenquiry, deleteenquiry, getAllenquiry } = require('../controller/enqCtrl');
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router();

router.post("/", authHandler, createenquiry)
router.put("/:id", authHandler, updateenquiry)
router.get("/" , getAllenquiry)
router.delete("/:id", authHandler, deleteenquiry)

module.exports = router
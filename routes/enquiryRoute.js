const express = require('express');
const { createenquiry, updateenquiry, deleteenquiry, getAllenquiry, getSingleenquiry } = require('../controller/enqCtrl');
const { authHandler, isAdmin } = require("../middleware/AuthVerification")

const router = express.Router();

router.post("/", authHandler, createenquiry)
router.put("/:id", authHandler, updateenquiry)
router.get("/" , getAllenquiry)
router.get("/:id" , getSingleenquiry)
router.delete("/:id", authHandler, deleteenquiry)

module.exports = router
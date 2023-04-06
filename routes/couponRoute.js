const express = require('express');
const { createCoupon, updateCoupon } = require('../controller/couponctrl');
const { authHandler, isAdmin } = require('../middleware/AuthVerification');
const router = express.Router();

router.post('/', authHandler, isAdmin, createCoupon)
router.put('/:id', authHandler, isAdmin, updateCoupon)

module.exports =router;
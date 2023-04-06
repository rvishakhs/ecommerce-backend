const express = require('express');
const { createCoupon, updateCoupon, deleteCoupon, getCoupon, getAllCoupons } = require('../controller/couponctrl');
const { authHandler, isAdmin } = require('../middleware/AuthVerification');
const router = express.Router();

router.post('/', authHandler, isAdmin, createCoupon)
router.put('/:id', authHandler, isAdmin, updateCoupon)
router.delete('/:id', authHandler, isAdmin, deleteCoupon)
router.get('/:id', getCoupon)
router.get('/', getAllCoupons)

module.exports =router;
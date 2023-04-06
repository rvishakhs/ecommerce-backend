const Coupon = require("../modals/couponModal")
const asynchandler = require ("express-async-handler")

// Creating new coupon

const createCoupon = asynchandler(async (req, res) => {
    try {
        const couponCreate = await Coupon.create(req.body)
        res.json(couponCreate)
    } catch (err) {
        throw new Error(`This error is related to creating a new coupon: ${err.message}`)
    }
});

// Updating existing coupon

const updateCoupon = asynchandler(async (req, res) => {
    const {id} = req.params
    try {
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {new : true})
        res.json(updatecoupon)
    } catch (err) {
        throw new Error(`This error is related to updating existing coupon: ${err.message}`)
    } 
})

// Delete existing coupon

const deleteCoupon =  asynchandler(async (req, res)=> {
        const {id} = req.params
    try {
        const deletedcoupon = await Coupon.findByIdAndDelete(id)
        res.json(deletedcoupon)

    } catch (err) {
        throw new Error(`This error is related to deleting existing coupon: ${err.message}`)
    } 
})

// Get a single coupon

const getCoupon = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
        const coupon = await Coupon.findById(id)
        res.json(coupon)

    } catch (err) {
        throw new Error(`This error is related to getting an existing coupon: ${err.message}`)
    }

})

// Getting all coupons 

const getAllCoupons = asynchandler(async (req, res)=> {
    try{
        const coupon = await Coupon.find()
        res.json(coupon)

    } catch (err) {
        throw new Error(`This error is related to fetching all coupons: ${err.message}`)
    }

})

module.exports = {createCoupon, updateCoupon, deleteCoupon, getCoupon, getAllCoupons}
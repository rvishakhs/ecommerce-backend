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


module.exports = {createCoupon, updateCoupon}
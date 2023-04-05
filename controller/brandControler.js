const Brand = require("../modals/brandModal")
const asynchandler = require("express-async-handler")

// Creating new  Brand

const createBrand = asynchandler(async (req, res)=> {
   try{
        const createBrand = await Brand.create(req.body)
        res.json(createBrand)

   } catch (err) {
        throw new Error (`This error occured while creating a new  Brand, For more info ${err.message}`)
   }
})

// Updating Existing  Brand

const updateBrand = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const updateBrand = await Brand.findByIdAndUpdate(id , req.body, {new : true})
         res.json(updateBrand)
 
    } catch (err) {
         throw new Error (`This error occured while Updating a  Brand, For more info ${err.message}`)
    }
 })

//  Delete existing  Brand

const deleteBrand = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const deleteBrand = await Brand.findByIdAndDelete(id)
         res.json(deleteBrand)
 
    } catch (err) {
         throw new Error (`This error occured while deleting a  Brand, For more info ${err.message}`)
    }
 })

//  Get one  Brand

const getSingleBrand = asynchandler(async(req, res)=> {
    const {id} = req.params;
    try {
        const singleBrand = await Brand.findById(id)
        res.json(singleBrand)

    } catch (err) {
        throw new Error (`This error occured while geting a  Brand, For more info ${err.message}`)
   }
});

// Get all Brands

const getAllBrands = asynchandler(async(req, res)=> {
    try {
        const allBrands = await Brand.find()
        res.json(allBrands)

    } catch (err) {
        throw new Error (`This error occured while geting a  Brand, For more info ${err.message}`)
   }
});



module.exports = {createBrand, updateBrand, deleteBrand, getSingleBrand, getAllBrands}
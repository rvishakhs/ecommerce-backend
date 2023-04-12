const color = require("../modals/colorModal")
const asynchandler = require("express-async-handler")

// Creating new color

const createColor = asynchandler(async (req, res)=> {
   try{
        const createcolor = await color.create(req.body)
        res.json(createcolor)

   } catch (err) {
        throw new Error (`This error occured while creating a new  color, For more info ${err.message}`)
   }
})

// Updating Existing  color

const updatecolor = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const updatecolor = await color.findByIdAndUpdate(id , req.body, {new : true})
         res.json(updatecolor)
 
    } catch (err) {
         throw new Error (`This error occured while Updating a  color, For more info ${err.message}`)
    }
 })

//  Delete existing  color

const deletecolor = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const deletecolor = await color.findByIdAndDelete(id)
         res.json(deletecolor)
 
    } catch (err) {
         throw new Error (`This error occured while deleting a  color, For more info ${err.message}`)
    }
 })

//  Get one  color

const getSinglecolor = asynchandler(async(req, res)=> {
    const {id} = req.params;
    try {
        const singlecolor = await color.findById(id)
        res.json(singlecolor)

    } catch (err) {
        throw new Error (`This error occured while geting a  color, For more info ${err.message}`)
   }
});

// Get all  categories

const getAllcolors = asynchandler(async(req, res)=> {
    try {
        const allcolor = await color.find()
        res.json(allcolor)

    } catch (err) {
        throw new Error (`This error occured while geting all  color, For more info ${err.message}`)
   }
});



module.exports = {createColor, updatecolor, deletecolor, getSinglecolor, getAllcolors}
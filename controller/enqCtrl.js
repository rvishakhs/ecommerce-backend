const enquiry = require("../modals/enqModal")
const asynchandler = require("express-async-handler")

// Creating new enquiry

const createenquiry = asynchandler(async (req, res)=> {
   try{
        const createenquiry = await enquiry.create(req.body)
        res.json(createenquiry)

   } catch (err) {
        throw new Error (`This error occured while creating a new  enquiry, For more info ${err.message}`)
   }
})

// Updating Existing  enquiry

const updateenquiry = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const updateenquiry = await enquiry.findByIdAndUpdate(id , req.body, {new : true})
         res.json(updateenquiry)
 
    } catch (err) {
         throw new Error (`This error occured while Updating a  enquiry, For more info ${err.message}`)
    }
 })

//  Delete existing  enquiry

const deleteenquiry = asynchandler(async (req, res)=> {
    const {id} = req.params
    try{
         const deleteenquiry = await enquiry.findByIdAndDelete(id)
         res.json(deleteenquiry)
 
    } catch (err) {
         throw new Error (`This error occured while deleting a  enquiry, For more info ${err.message}`)
    }
 })

//  Get one  enquiry

const getSingleenquiry = asynchandler(async(req, res)=> {
    const {id} = req.params;
    try {
        const singleenquiry = await enquiry.findById(id)
        res.json(singleenquiry)

    } catch (err) {
        throw new Error (`This error occured while geting a  enquiry, For more info ${err.message}`)
   }
});

// Get all  categories

const getAllenquiry = asynchandler(async(req, res)=> {
    try {
        const allenquiry = await enquiry.find()
        res.json(allenquiry)

    } catch (err) {
        throw new Error (`This error occured while geting all  enquiry, For more info ${err.message}`)
   }
});



module.exports = {createenquiry, updateenquiry, deleteenquiry, getSingleenquiry, getAllenquiry}
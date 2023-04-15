const {cloudImgUpload, cloudImgDelete} = require("../utils/cloudinary")
const asynchandler = require("express-async-handler")
const fs = require ("fs")
//  Image uploading Functionality 

const ImageUpload = asynchandler(async (req, res)=> {

    try {
        const uploader = (path) => cloudImgUpload(path, "images");
        const url = [];
        const files = req.files;

        for (const file of files) {
            const {path} = file
            const newpath = await uploader(path)
            url.push(newpath)
            fs.unlinkSync(path)
        }

        const images = url.map((file) => {
            return file
        })
        res.json(images)

    
    } catch (err) {
        throw new Error (`This error is related to image upload functionality and more details ${err.message}`)
    }
})

// Image delete Functionality

const ImageDelete = asynchandler(async (req, res)=> {

    const {id} = req.params
    try {
        const deleted =  cloudImgDelete(id, "images");
        res.json(deleted)
        
    
    } catch (err) {
        throw new Error (`This error is related to image upload functionality and more details ${err.message}`)
    }
})


module.exports = {ImageUpload, ImageDelete}
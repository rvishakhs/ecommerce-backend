const mutler = require("multer")  // For handling the multimedia files 
const sharp = require("sharp")   // For image reprocessing like width and height
const path = require("path")  // accessing path modules


// This enables storage functionality and naming files uploaded

const multerStorage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, path.join(__dirname,"../public/images" ))
    },
    filename : function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg") 
    }
})

// File filter for uploading images only

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb({message : "Unsupported file type"}, false)
    }
}

// File uploading functionality for uploading

const uploadPhoto = mutler({
    storage: multerStorage,
    fileFilter : multerFilter,
    limits : {fieldSize : 2000000}
})

// Image resizing functionality after upload for products

const productImgResize = async (req, file, cb) => {
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path)
            .resize(300,300)
            .toFormat("jpeg")
            .jpeg({quality : 90})
            .toFile(`public/images/products/${file.filename}`)
        })
    ),
    next();
}

// Image resizing functionality after upload for blogs

const blogImgResize = async (req, file, cb) => {
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path)
            .resize(300,300)
            .toFormat("jpeg")
            .jpeg({quality : 90})
            .toFile(`public/images/blog /${file.filename}`)
        })
    ),
    next();
}

module.exports = {uploadPhoto, productImgResize, blogImgResize}

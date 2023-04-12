const cloudinary = require('cloudinary')

// Configuration 
cloudinary.config({
    cloud_name: "dax7kkpji",
    api_key: "163593619434559",
    api_secret: "DIGCqxKZ68yGLvkWMi0bnqkEp3o"
  });
  

  
const cloudImgUpload = async(filetoupload) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(filetoupload, (result) => {
            resolve({
                url : result.secure_url,
                asset_id : result.asset_id,
                public_id : result.public_id,

            },
            {
                resource_type : "auto",
            })
        })
    })
}  
const cloudImgDelete = async(filetodelete) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(filetodelete, (result) => {
            resolve({
                url : result.secure_url,
                asset_id : result.asset_id,
                public_id : result.public_id,

            },
            {
                resource_type : "auto",
            })
        })
    })
}  

module.exports =  {cloudImgUpload, cloudImgDelete }
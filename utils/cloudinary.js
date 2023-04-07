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
            },
            {
                resource_type : "auto",
            })
        })
    })
}  

module.exports =  cloudImgUpload
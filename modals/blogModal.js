const mongoose = require('mongoose'); // Erase if already required
const User = require("../modals/userModal")

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numOfViews : {
        type: Number,
        default: 0
    },
    isLiked : {
        type: Boolean,
        default: false
    },
    isDisLiked: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Array 
    },
    
    disLikes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
],
    images : {
        type : String,
        default : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
    },
    Authur : {
        type: "String",
        default :"Admin"
    }
},
{
    toJSON : {
        virtuals : true,
    },
    toObject : {
        virtuals : true,
    },
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Blog', BlogSchema);
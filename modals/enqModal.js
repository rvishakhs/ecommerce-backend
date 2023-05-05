const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var enquirySchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true,
    },
    mobile : {
        type:Number,
        required:true,
    },
    comments : {
        type:String,
        required:true,
    },
    enqStatus: {
        type : String,
        default : "Submitted",
        enum : [
            "Submitted",
            "Reviewing",
            "In Progress",
            "Resolved",
        ]
    },
},
{
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('enquiry', enquirySchema);
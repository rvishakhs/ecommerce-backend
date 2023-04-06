const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
        unique:true,
        upperCase:true
    },
    discount : { 
        type : Number,
        default: 0
    },
    expiry : {
        type : Date,
    }
},
{
    timestamps : true,
}
);

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);
const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
        
    },
    price : {
        type: Number,
        required:true,
    },
    category : {
        type: String,
        required : true,
    },
    brand : {
        type: String,
        required: true, 
    },
    quantity : {
        type: Number,
        required:true,
    },
    sold :{
        type: Number,
        default: 0
    },
    images : [{
        public_id : String,
        url : String,
    }],
    color : [
        {
            id: Number,
            color : String
        }
    ],
    rating : [{
        star : Number,
        comment : String,
        PostedBy : {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }],
    totalrating : {
        type : Number,
        default : 0,
    }
},
{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
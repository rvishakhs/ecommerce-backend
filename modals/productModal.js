const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true,
    },
    brand : {
        type: string,
        enum: ["Apple", "Samsung", "Sony"]
    },
    quantity : {
        type: Number,
        required:true,
    },
    sold :{
        type: Number,
        default: 0
    },
    images : {
        type: Array,
    },
    color : {
        type: String,
        enum : ["Black", "Red", "Green", "Yellow"]
    },
    rating : [{
        star : Number,
        PostedBy : {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    }]
},
{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
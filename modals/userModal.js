const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")  // To encrypt password import bcrypt

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

// Create schema then 

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt) //refer the bcrypt readme for more details
})





//Export the model
module.exports = mongoose.model('User', userSchema);
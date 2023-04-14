const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")  // To encrypt password import bcrypt
const crypto = require('crypto'); // To create a new password

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
    role: {
        type: String,
        default: "user" 
    },
    blocked: {
        type: Boolean,
        default: false
    },
    cart : {
        type: Array,
        default: [],        
    },
    address: {
        type : String,
    },
    token :{
        type : String,
    },
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref:"Product"}],
    refreshToken :{
        type: String
    },
    passwordchangedat : Date,
    passwordresettoken : String,
    passwordresetexpires: Date,

}, 
{
    timestamps: true
});

// Create schema then 

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt) //refer the bcrypt readme for more details
})

userSchema.methods.isPaasswordMatched = async function(enterdpass) {
    return await bcrypt.compare(enterdpass, this.password)
}

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordresettoken  =  crypto.createHash("sha256").update(resettoken).digest("hex");
    this.passwordresetexpires = Date.now() + 30 * 60 * 1000

    return resettoken;
}


//Export the model
module.exports = mongoose.model('User', userSchema);
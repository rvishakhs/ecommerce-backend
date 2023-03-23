const mongoose = require('mongoose');


const dbconnection = () => {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
        console.log("Database connection started");
    }
    catch(err){
        console.log(`Database connection error ${err}`)
    }
}

module.exports = dbconnection
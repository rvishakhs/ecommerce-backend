const mongoose = require('mongoose');


const dbconnection = () => {
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connection started");
    }
    catch(err){
        console.log(`Database connection error ${err}`)
    }
}

module.exports = dbconnection
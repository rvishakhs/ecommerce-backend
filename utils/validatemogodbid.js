const mongoose = require('mongoose');

const MongoDbValidation = (id) => {
    const isVaild = mongoose.Types.ObjectId.isValid(id);
    if(!isVaild) throw new Error("MongoDb id is not valid or not found") 
}

module.exports = MongoDbValidation;
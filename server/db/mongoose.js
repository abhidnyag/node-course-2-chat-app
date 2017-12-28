var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ChatApp", function(err, db){
    if(err){
        throw err;
    }
    console.log('Connected to DB')
});

module.exports = {mongoose};
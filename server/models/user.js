var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
      type: String,
      required: true
    },
    room: {
        type: String,
        required: true
    }
});

module.exports = {User};
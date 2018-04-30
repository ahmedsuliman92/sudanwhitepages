var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    usr_lname: {
        type: String,
        required: true
    },
    usr_fname: {
        type: String,
        required: true
    },
    usr_password: {
        type: String,
        required: true
    },
    usr_email: {
        type: String,
        required: true
    }


});



module.exports = mongoose.model('Users', UsersSchema);

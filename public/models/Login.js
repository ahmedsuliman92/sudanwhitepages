var mongoose = require('mongoose');



var LoginSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    usr_email: {
        type: String,
        required: true
    },
    usr_password: {
        type: String,
        required: true
    }


});



module.exports = mongoose.model('Login', LoginSchema);

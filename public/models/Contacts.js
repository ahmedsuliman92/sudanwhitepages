var mongoose = require('mongoose');



var ContactsSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    ContactName: {
        type: String,
        required: true
    },
    ContactLocation: {
        type: String,
        required: true
    },
    ContactJob: {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        required: true
    }


});



module.exports = mongoose.model('Contacts', ContactsSchema);

var mongoose = require('mongoose');



var SessionsSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    _id: {
        type: String
    },
    session: {
        type: String
    },
    expires: {
        type: String
    }
});



module.exports = mongoose.model('Sessions', SessionsSchema);

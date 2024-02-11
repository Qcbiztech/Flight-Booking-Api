const mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
    origin: {
        type: String,
        trim: true,
        required: [true, 'Origin is required.']
    }, 
    destination: {
        type: String,
        trim: true,
        required: [true, 'Destination is required.']
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Sector', UserSchema);
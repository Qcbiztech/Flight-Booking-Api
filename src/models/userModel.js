const mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required.']
    },
    mobile: {
        type: Number,
        required: [true, 'Mobile is required.']
    },
    email: {
        type: String,
        unique: [true],
        lowercase: true,
        trim: true,
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Assuming there are two roles: admin and user
        default: 'user' // Default role will be user
    },
    created: {
        type: Date,
        default: Date.now
    }
})
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
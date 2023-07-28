const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
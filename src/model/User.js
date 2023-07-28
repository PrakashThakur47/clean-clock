const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    firebase_uid: {type : String},  
    contact: {
        type: Number,
        required: true
    },
    is_onboarded: {
        type: Boolean
    },
    group_exist: {type: Boolean},
    profession: { type: String },
    age: { type: Number },
    groups_joined: [{
        group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: false }
    }],
    profile_picture: { type: String },
    fcm_token: {type: String}

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;


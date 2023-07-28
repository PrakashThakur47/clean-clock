const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = Schema({
    name: { type: String },
    description: { type: String },
    is_requested: { type: Boolean, default:false},
    is_approved: {type : Boolean, default: false},
    total_user: { type: Number },
    is_onboarded: {
        type: Boolean,
        default: false
    },
    posts: [{
        post_id: { type: Schema.Types.ObjectId, ref: 'Group', required: false }
    }]

}, { timestamps: true });

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
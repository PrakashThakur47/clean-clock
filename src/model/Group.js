const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = Schema({
    name: { type: String },
    description: { type: String },
    is_requested: { type: Boolean, default:false},
    is_approved: {type : Boolean, default: false},
    is_disabled: {type: Boolean, default:false},
    total_user: { type: Number },
    posts: [{
        post_id: { type: Schema.Types.ObjectId, ref: 'Group', required: false }
    }]

}, { timestamps: true });

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
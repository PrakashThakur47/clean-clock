const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserGroupSchema = Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: false },
    group_details : {
        addiction_duration: { type: String },
        freq: { type: String },
        craving_time: {type : String},  
    }
}, { timestamps: true });
    
const UserGroupDetail = mongoose.model('UserGroupDetail', UserGroupSchema);
module.exports = UserGroupDetail;
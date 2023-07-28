const Group = require('../model/Group');

exports.updateGroup = async (group_id, updateInfo) =>{
    const groupUpdate = await Group.findOneAndUpdate({ _id: group_id }, updateInfo)
    console.log(groupUpdate)
    return groupUpdate? true : false
}

exports.createNewGroup = async (requestBody) =>{
    let group = new Group(requestBody);
    group.save();
    console.log(group)
    return group
}
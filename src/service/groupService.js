const Group = require('../model/Group');

exports.updateGroup = async (group_id, updateInfo) => {
    const groupUpdate = await Group.findOneAndUpdate({ _id: group_id }, updateInfo)
    return groupUpdate ? true : false
}

exports.createNewGroup = async (requestBody) => {
    let group = new Group(requestBody);
    group.is_approved = true;
    group.save();
    return group
}

exports.fetchGroupsByStatus = async (status, limit, offset) => {
    let groupsFound
    switch (status) {
        case 'APPROVED':
            groupsFound = await Group.find({ is_approved: true, is_disabled: false }).limit(limit).skip(offset)
            break;
        case 'REQUESTED':
            groupsFound = await Group.find({ is_approved: false, is_request: true, is_disabled: false }).limit(limit).skip(offset)
            break;
    }
    return groupsFound
}

exports.disableGroup = async (groupId) => {
    return groupDisabled = await Group.updateOne({ _id: groupId }, { is_disabled: true })
}

exports.approveRequest = async (groupId) =>{
    return groupApproved = await Group.updateOne({ _id: groupId }, { is_approved: true })
}

exports.fetchGroup = async (requestBody) => {
    let count
    const matchGroup = { is_approved: true, is_disabled: false }
    const matchSearchText = { name: { $regex: requestBody.searchText, $options: 'i' } }
    const groupsFetched = await Group.aggregate([
      { $match: matchGroup },
      { $match: matchSearchText },
      { $sort: { createdAt: -1 } },
      { $skip: requestBody.offset },
      { $limit: requestBody.limit }
    ])
    
    if (requestBody.searchText) {
      const group = await Group.aggregate([
        { $match: matchSearchText }
      ])
      count = group.length

    } else {
      count = await Group.countDocuments(matchGroup)
    }
    return { groupsFetched, count }
}
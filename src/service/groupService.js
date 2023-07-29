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


exports.disableStatus = async (groupId) => {
  const groupFound = await Group.findOne({ _id: groupId })
  if (groupFound.is_disabled === false)
    return groupDisabled = await Group.updateOne({ _id: groupId }, { is_disabled: true, is_approved: false })
  return groupDisabled = await Group.updateOne({ _id: groupId }, { is_disabled: false, is_approved: true })

}

exports.approveRequest = async (groupId) => {
  return groupApproved = await Group.updateOne({ _id: groupId }, { is_approved: true })
}

exports.fetchGroup = async (requestBody) => {

  let count, matchGroup

  switch (requestBody.status) {
    case 'APPROVED':
      matchGroup = { is_requested: false }
      break;
    case 'REQUESTED':
      matchGroup = { is_requested: true }
      break;
  }
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
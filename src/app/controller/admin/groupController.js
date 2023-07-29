const responder = require("../../../util/responder");
const Group = require("../../../model/Group");
const GroupService = require("../../../service/groupService");
const GroupListResponse = require("../../../resource/admin/GroupListResponse.js");

exports.createUpdateGroup = async (request, response, next) => {
  try {
    if (request.body.group_id) {
      let toUpdate = {};
      if (request.body.hasOwnProperty("name")) toUpdate.name = request.body.name;
      if (request.body.hasOwnProperty("description")) toUpdate.description = request.body.description;

      let updatedGroup = await GroupService.updateGroup(request.body.group_id, toUpdate);
      return responder(request, response, next, true, updatedGroup ? 107 : 108, {});
    }

    let group = await GroupService.createNewGroup(request.body);
    return responder(request, response, next, true, group ? 109 : 110, { group: group._id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.fetchGroup = async (request, response, next) => {
  try {
    const  {groupsFetched, count} = await GroupService.fetchGroup(request.body);
    console.log(groupsFetched)
    return responder(request, response, next, true, !groupsFetched.length ? 111 : 112, !groupsFetched.length ? [] : { total: count, groups: GroupListResponse.collection(groupsFetched) });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.approveRequest = async (request, response, next) => {
  try {
    const approveRequest = await GroupService.approveRequest(request.body.group_id);
    return responder(request, response, next, true, approveRequest.modifiedCount ? 117 : 118, {});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.disableStatus = async (request, response, next) => {
  try {
    const group_id = request.body.group_id;
    const disableGroup = await GroupService.disableStatus(group_id);
    return responder(request, response, next, true, disableGroup.modifiedCount ? 115 : 116, {});
  } catch (error) {
    console.log(error);
    next(error);
  }
};


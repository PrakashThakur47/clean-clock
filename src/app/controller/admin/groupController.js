const responder = require("../../../util/responder");
const Group = require("../../../model/Group")
const GroupService = require('../../../service/groupService');
const GroupListResponse = require('../../../resource/admin/GroupListResponse.js')

exports.createUpdateGroup = async (request, response, next) => {
    try {
        if (request.body.group_id) {
            let toUpdate = {};
            if (request.body.hasOwnProperty('name'))
                toUpdate.name = request.body.name;
            if (request.body.hasOwnProperty('description'))
                toUpdate.description = request.body.description;

            let updatedGroup = await GroupService.updateGroup(request.body.group_id, toUpdate);
            return responder(request, response, next, true, updatedGroup ? 107 : 108, {});
        }

        let group = await GroupService.createNewGroup(request.body);
        return responder(request, response, next, true, group ? 109 : 110, { "group": group._id });
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}

exports.fetchGroupsByStatus = async (request, response, next) => {
    try {
        const groupsFound = await GroupService.fetchGroupsByStatus(request.body.status, request.body.limit, request.body.offset)

        return responder(request, response, next, true, !groupsFound.length ? 111 : 112, !groupsFound.length ? {} : GroupListResponse.collection(groupsFound))

    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.approveRequest = async (request,response,next) =>{
    try {
        const approveRequest = await GroupService.approveRequest(request.body.group_id)
        return responder(request, response, next, true, approveRequest.modifiedCount ? 117 : 118, {});
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.disableGroup = async (request,response,next) =>{
    try {
        const group_id = request.body.group_id
        const disableGroup = await GroupService.disableGroup(group_id)
        return responder(request, response, next, true, disableGroup.modifiedCount ? 115 : 116, {});
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const responder = require("../../../util/responder");
const Group = require("../../../model/Group")
const GroupService = require('../../../service/groupService');

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
        return responder(request, response, next, true, group ? 109 : 110 , {});
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}
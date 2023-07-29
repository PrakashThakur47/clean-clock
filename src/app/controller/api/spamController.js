const responder = require("../../../util/responder");
const SpamService = require("../../../service/spamService");
const SpamResponse = require("../../../resource/common/SpamResponse");

/**
 *
 * @param request
 * @param response
 * @param next
 */
exports.spamCreate = async (request, response, next) => {
  try {
    // Spam create work
    const spam = await SpamService.spamCreate(request.body, request.user.userId);
    if (!spam) {
      return responder(request, response, next, true, 102, {});
    }
    return responder(request, response, next, true, 104, new SpamResponse(spam).exec());
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param request
 * @param response
 * @param next
 */
exports.spamGet = async (request, response, next) => {
  try {
    // Spam get work
    const spams = await SpamService.spamGet(request.params.spam_id);
    if (!spams) {
      return responder(request, response, next, true, 102, {});
    }
    if (request.params.spam_id) {
      return responder(request, response, next, true, 104, new SpamResponse(spams).exec());
    }
    return responder(request, response, next, true, 104, SpamResponse.collection(spams));
  } catch (error) {
    next(error);
  }
};

const responder = require("../../../util/responder");
const PostService = require("../../../service/postService");
const PostResponse = require("../../../resource/common/PostResponse");

/**
 *
 * @param request
 * @param response
 * @param next
 */
exports.postCreate = async (request, response, next) => {
  try {
    // Post create work
    const post = await PostService.postCreate(request.body, request.user.userId);
    if (!post) {
      return responder(request, response, next, true, 102, {});
    }
    return responder(request, response, next, true, 104, new PostResponse(post).exec());
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
exports.postGet = async (request, response, next) => {
  try {
    // Post get work
    const posts = await PostService.postGet(request.params.post_id);
    if (!posts) {
      return responder(request, response, next, true, 102, {});
    }
    if (request.params.post_id) {
      return responder(request, response, next, true, 104, new PostResponse(posts).exec());
    }
    return responder(request, response, next, true, 104, PostResponse.collection(posts));
  } catch (error) {
    next(error);
  }
};

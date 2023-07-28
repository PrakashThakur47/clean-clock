const Constants = require("../config/constants");

/**
 *
 * @param _request
 * @param response
 * @param _next
 * @param status
 * @param messageCode
 * @param data
 */
exports.slugify = (string) => {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^(-+|-+$)/g, "");
};

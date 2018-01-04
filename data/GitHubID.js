const defaults = require("lodash.defaults");
const jsc = require("jsverify");

module.exports = function GitHubID(opts) {
  opts = defaults({}, opts, {
  });
  return jsc.integer;
}

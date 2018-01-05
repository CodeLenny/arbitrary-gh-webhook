const defaults = require("lodash.defaults");
const jsc = require("jsverify");

module.exports = function GitHubTime(opts) {
  opts = defaults({}, opts, {
  });
  return jsc
    .datetime
    .smap(
      time => time.toISOString(),
      str => Date.parse(str),
    );
}

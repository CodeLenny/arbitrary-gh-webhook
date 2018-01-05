const defaults = require("lodash.defaults");
const jsc = require("jsverify");
const RandExp = require("randexp");

module.exports = function GitHubUsername(opts) {
  opts = defaults({}, opts, {
  });

  return {
    // regex modified from https://github.com/shinnn/github-username-regex
    generator: (size) => new RandExp(/^[a-z\d](?:[a-z\d][a-z\d]|-(?:[a-z\d])){0,19}$/i).gen(),
    shrink: (val) => [],
    show: str => str,
  };
}

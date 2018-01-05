const test = require("ava");
const GitHubUsername = require("data/GitHubUsername");

test("show() returns the username", t => {
  t.is(GitHubUsername().show("bobthetester"), "bobthetester");
});

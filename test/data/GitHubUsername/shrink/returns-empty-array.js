const test = require("ava");
const GitHubUsername = require("data/GitHubUsername");

test("shrink() returns empty array", t => {
  t.deepEqual(GitHubUsername().shrink("bobthetester"), []);
});

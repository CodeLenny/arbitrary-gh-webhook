const test = require("ava");
const GitHubTime = require("data/GitHubTime");

test("returns an empty array", t => {
  t.deepEqual(GitHubTime().shrink("2015-05-05T23:40:28Z"), []);
});

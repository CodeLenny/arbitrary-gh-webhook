const test = require("ava");
const GitHubTime = require("data/GitHubTime");

test("prints the time", t => {
  t.is(GitHubTime().show("2015-05-05T23:40:28Z"), "\"2015-05-05T23:40:28Z\"");
});

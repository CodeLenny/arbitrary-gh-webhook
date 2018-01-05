const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const GitHubUsername = require("data/GitHubUsername");
const githubUsernameRegex = require("github-username-regex");

jsc.ava({
  suite: "passes 'github-username-regex' regex",
}, [ GitHubUsername() ], (t, username) => {
  t.plan(1);
  t.true(githubUsernameRegex.test(username));
});

const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const GitHubTime = require("data/GitHubTime");

// From https://stackoverflow.com/a/37563868
const regex = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/;

jsc.ava({
  suite: "passes regex",
}, [ GitHubTime() ], (t, time) => {
  t.plan(1);
  t.true(regex.test(time));
});

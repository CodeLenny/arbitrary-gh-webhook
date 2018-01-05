const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const WebhookIssue = require("data/WebhookIssue");

jsc.ava({
  suite: "chooses IDs",
}, [ WebhookIssue.build() ], (t, issue) => {
  t.plan(1);
  t.is(typeof issue.id, "number");
});

jsc.ava({
  suite: "creates 'url' field",
}, [ WebhookIssue.build() ], (t, issue) => {
  t.plan(1);
  t.is(typeof issue["url"], "string");
});

jsc.ava({
  suite: "doesn't create 'repo' field",
}, [ WebhookIssue.build() ], (t, issue) => {
  t.plan(1);
  t.is(typeof issue["repo"], "undefined");
});

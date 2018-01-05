const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const WebhookUser = require("data/WebhookUser");

jsc.ava({
  suite: "chooses IDs",
}, [ WebhookUser.build() ], (t, user) => {
  t.plan(1);
  t.is(typeof user.id, "number");
});

jsc.ava({
  suite: "computes 'url' field",
}, [ WebhookUser.build() ], (t, user) => {
  t.plan(1);
  t.is(user.html_url, `https://github.com/${user.login}`);
});

jsc.ava({
  suite: "defaults 'type' to 'User'",
}, [ WebhookUser.build() ], (t, user) => {
  t.plan(1);
  t.is(user.type, "User");
});

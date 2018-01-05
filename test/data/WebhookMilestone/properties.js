const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const WebhookMilestone = require("data/WebhookMilestone");

jsc.ava({
  suite: "chooses IDs",
}, [ WebhookMilestone.build() ], (t, webhook) => {
  t.plan(1);
  t.is(typeof webhook.id, "number");
});

jsc.ava({
  suite: "creates 'url' field",
}, [ WebhookMilestone.build() ], (t, webhook) => {
  t.plan(1);
  t.is(typeof webhook["url"], "string");
});

jsc.ava({
  suite: "doesn't create 'repo' field",
}, [ WebhookMilestone.build() ], (t, webhook) => {
  t.plan(1);
  t.is(typeof webhook["repo"], "undefined");
});

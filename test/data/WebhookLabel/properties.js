const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const WebhookLabel = require("data/WebhookLabel");

jsc.ava({
  suite: "chooses IDs",
}, [ WebhookLabel.build() ], (t, label) => {
  t.plan(1);
  t.is(typeof label.id, "number");
});

jsc.ava({
  suite: "creates 'default' field",
}, [ WebhookLabel.build() ], (t, label) => {
  t.plan(1);
  t.is(typeof label["default"], "boolean");
});

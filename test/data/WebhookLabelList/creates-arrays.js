const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const WebhookLabelList = require("data/WebhookLabelList");

jsc.ava({
  suite: "creates an array",
}, [ WebhookLabelList.build() ], (t, list) => {
  t.plan(1);
  t.true(Array.isArray(list));
});

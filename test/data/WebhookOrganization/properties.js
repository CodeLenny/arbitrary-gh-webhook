const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const WebhookOrganization = require("data/WebhookOrganization");

jsc.ava({
  suite: "chooses IDs",
}, [ WebhookOrganization.build() ], (t, org) => {
  t.plan(1);
  t.is(typeof org.id, "number");
});

jsc.ava({
  suite: "computes 'url' field",
}, [ WebhookOrganization.build() ], (t, org) => {
  t.plan(1);
  t.is(org.html_url, `https://github.com/${org.login}`);
});

jsc.ava({
  suite: "defaults 'type' to 'Organization'",
}, [ WebhookOrganization.build() ], (t, org) => {
  t.plan(1);
  t.is(org.type, "Organization");
});

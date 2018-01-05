const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const ArbitraryIssuesEvent = require("hooks/ArbitraryIssuesEvent");
const WebhookOrganization = require("data/WebhookOrganization");

jsc.ava(
  {
    suite: "can create an 'organization' field",
  },
  [
    ArbitraryIssuesEvent.build({
      organization: WebhookOrganization.build(),
    }),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(typeof webhook.body.organization, "object");
  }
);

const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const ArbitraryIssuesEvent = require("hooks/ArbitraryIssuesEvent");

jsc.ava(
  {
    suite: "creates an 'action' field, which doesn't have spaces",
  },
  [
    ArbitraryIssuesEvent.build(),
  ],
  (t, webhook) => {
    t.plan(2);
    t.is(typeof webhook.body.action, "string");
    t.is(webhook.body.action.indexOf(" "), -1);
  }
);

jsc.ava(
  {
    suite: "creates a 'repository' field",
  },
  [
    ArbitraryIssuesEvent.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(typeof webhook.body.repository, "object");
  }
);

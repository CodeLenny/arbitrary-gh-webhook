const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const ArbitraryIssuesEvent = require("hooks/ArbitraryIssuesEvent");

jsc.ava(
  {
    suite: "sets 'X-GitHub-Event' header to 'issues'",
    runs: 10,
  },
  [
    ArbitraryIssuesEvent.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(webhook.headers["X-GitHub-Event"], "issues");
  }
);

jsc.ava(
  {
    suite: "'event' can be overridden",
    runs: 10,
  },
  [
    ArbitraryIssuesEvent.build({
      event: jsc.constant("foo"),
    }),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(webhook.headers["X-GitHub-Event"], "foo");
  }
);

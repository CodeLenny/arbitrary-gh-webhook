const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const ArbitraryGitHubWebhook = require("hooks/ArbitraryGitHubWebhook");

jsc.ava(
  {
    suite: "provides a 'body' object",
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(typeof webhook.body, "object");
  }
);

jsc.ava(
  {
    suite: "'body' object is an empty object by default",
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.deepEqual(webhook.body, {});
  }
);

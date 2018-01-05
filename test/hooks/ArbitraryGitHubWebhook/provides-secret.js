const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const ArbitraryGitHubWebhook = require("hooks/ArbitraryGitHubWebhook");

jsc.ava(
  {
    suite: "provides a 'secret' field",
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(typeof webhook.secret, "string");
  }
);

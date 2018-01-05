const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const ArbitraryGitHubWebhook = require("hooks/ArbitraryGitHubWebhook");

jsc.ava(
  {
    suite: "provides a 'headers' object",
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(typeof webhook.headers, "object");
  }
);

jsc.ava(
  {
    suite: "creates valid 'User-Agent'",
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.true(/GitHub-Hookshot\/[0-f]{7}/.test(webhook.headers["User-Agent"]));
  }
);

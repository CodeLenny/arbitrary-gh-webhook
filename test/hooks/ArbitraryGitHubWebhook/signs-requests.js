const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const verifyGithubWebhook = require("verify-github-webhook").default;

/**
 * Using a request that actually has a 'body' object.
*/
const ArbitraryIssuesEvent = require("hooks/ArbitraryIssuesEvent");

jsc.ava(
  {
    suite: "has an 'X-Hub-Signature' field when 'useSecret = true'",
  },
  [
    ArbitraryIssuesEvent.build({
      useSecret: true,
    }),
  ],
  (t, webhook) => {
    t.plan(2);
    t.is(webhook.useSecret, true);
    t.is(typeof webhook.headers["X-Hub-Signature"], "string");
  }
);

jsc.ava(
  {
    suite: "doesn't has an 'X-Hub-Signature' field when 'useSecret = false'",
  },
  [
    ArbitraryIssuesEvent.build({
      useSecret: false,
    }),
  ],
  (t, webhook) => {
    t.plan(2);
    t.is(webhook.useSecret, false);
    t.is(typeof webhook.headers["X-Hub-Signature"], "undefined");
  }
);

jsc.ava(
  {
    suite: "signs the body with the given secret",
  },
  [
    ArbitraryIssuesEvent.build({
      useSecret: true,
    }),
  ],
  (t, webhook) => {
    t.plan(1);
    t.true(verifyGithubWebhook(
      webhook.headers["X-Hub-Signature"],
      JSON.stringify(webhook.body),
      webhook.secret
    ));
  }
);

const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const verifyGithubWebhook = require("verify-github-webhook").default;

/**
 * Using a request that actually has a 'body' object.
*/
const ArbitraryIssuesEvent = require("hooks/ArbitraryIssuesEvent");

jsc.ava(
  {
    suite: "has an 'X-Hub-Signature' field",
  },
  [
    ArbitraryIssuesEvent.build(),
  ],
  (t, webhook) => {
    t.plan(1);
    t.is(typeof webhook.headers["X-Hub-Signature"], "string");
  }
);


jsc.ava(
  {
    suite: "signs the body with the given secret",
  },
  [
    ArbitraryIssuesEvent.build(),
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

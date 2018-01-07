# Arbitrary GitHub Webhooks

[![arbitrary-gh-webhook on npm](https://img.shields.io/npm/v/arbitrary-gh-webhook.svg)](https://www.npmjs.com/package/arbitrary-gh-webhook)
[![CI Results](https://img.shields.io/travis/CodeLenny/arbitrary-gh-webhook.svg)](https://travis-ci.org/CodeLenny/arbitrary-gh-webhook)
[![Code Coverage](https://img.shields.io/codecov/c/github/codelenny/arbitrary-gh-webhook.svg)](https://codecov.io/gh/CodeLenny/arbitrary-gh-webhook)
[![License details](https://img.shields.io/npm/l/arbitrary-gh-webhook.svg)](https://opensource.org/licenses/MIT)

QuickCheck data for GitHub Webhooks.

### Status

`arbitrary-gh-webhook` is partially developed,
with each webhook being implemented in two stages.

**Stage 1** webhooks are roughly implemented,
but may use generic "random strings" in some places instead of properly-formatted URLs,
and might have some values that don't match (labels may belong to a different repository than the issue they are attached to).

**Stage 2** will attempt to fix some of these issues by doing more post-processing of the generated data to make sure data makes sense.

#### Status of Each Webhook

- ArbitraryIssuesEvent  
  Stage 1 added in [v0.1.0][]

## Example Usage

### Raw Webhook Testing

Want semi-random [`IssuesEvent`][] webhooks
to test an `issueHasLabels` function?

Let's setup a testing environment.  You'll need [JSVerify][], a standard JavaScript [QuickCheck][] library.

We'll also be using [`ava-verify`][] in these examples to easily use [JSVerify][] with the [AVA][] test runner.

```js
const jsc = require("jsverify");
jsc.ava = require("ava-verify");
```

Then grab `ArbitraryIssuesEvent` from this project, as well as the code you want to test (`issueHasLabels`):

```js
const ArbitraryIssuesEvent = require("arbitrary-gh-webhook/hooks/ArbitraryIssuesEvent");
const issueHasLabels = require("../issueHasLabels");
```

Now write your tests!  Thanks to [JSVerify][] and [`ava-verify`][], they will run multiple times
(by default, 100 iterations) with different test data.

```js
jsc.ava({
    suite: "issueHasLabels returns a boolean",
  }, [
    ArbitraryIssuesEvent.build(),
  ], (t, issueData) => {
    t.is(typeof issueHasLabels(issueData), "boolean");
  }
);
```

Additionally, `arbitrary-gh-webhook` was built using [ConfigurableArbitrary][], which allows you to tweak
how webhooks are built.

For instance, you might want to test specifically what happens if the webhook returns an issue with a specific number of labels.

You can override specific parts of the webhook, while the rest is still randomly created:

```js
const jsc = require("jsverify");
jsc.ava = require("ava-verify");
const arrayRange = require("jsverify-array-range");

const ArbitraryIssuesEvent = require("arbitrary-gh-webhook/hooks/ArbitraryIssuesEvent");
const WebhookIssue = require("arbitrary-gh-webhook/data/WebhookIssue");
const WebhookLabelList = require("arbitrary-gh-webhook/data/WebhookLabelList");

const issueHasLabels = require("../issueHasLabels");


jsc.ava({
    suite: "issueHasLabels returns 'false' if Issue has 0 labels",
  }, [
    ArbitraryIssuesEvent.build({
      issue: WebhookIssue.build({
        labels: WebhookLabelList.build({ max: 0 }),
      }),
    }),
  ], (t, issueData) => {
    t.is(issueHasLabels(issueData), false);
  }
);

jsc.ava({
    suite: "issueHasLabels returns 'true' if Issue has 1+ labels",
  }, [
    ArbitraryIssuesEvent.build({
      issue: WebhookIssue.build({
        labels: WebhookLabelList.build({ min: 1 }),
      }),
    }),
  ], (t, issueData) => {
    t.is(issueHasLabels(issueData), true);
  }
);
```

### Usage with [SuperAgent][]

Requests include a built-in [SuperAgent][] module, so you can easily send requests to a webserver.

Let's say you've got a standard [Express][] server that should handle the [`IssuesEvent`][].

```js
const jsc = require("jsverify");
jsc.ava = require("ava-verify");
const ArbitraryIssuesEvent = require("arbitrary-gh-webhook/hooks/ArbitraryIssuesEvent");
const request = require("supertest");

const Server = require("../index.js");

jsc.ava({
    suite: "server stores new issues",
  }, [
    ArbitraryIssuesEvent.build(),
  ], async (t, webhook) => {
    t.plan(2);
    const server = new Server();
    await request(server.app)
      .post("/hook/gh/issues")
      .use(webhook.superagent)
      .then(res => t.is(res.status, 200));
    t.true(server.hasIssue(webhook.body.issue.id));
  }
);
```

[QuickCheck]: https://en.wikipedia.org/wiki/QuickCheck
[JSVerify]: https://github.com/jsverify/jsverify
[AVA]: https://github.com/avajs/ava
[ConfigurableArbitrary]: https://github.com/rweda/configurable-arbitrary
[`ava-verify`]: https://www.npmjs.com/package/ava-verify
[SuperAgent]: https://github.com/visionmedia/superagent
[Express]: https://expressjs.com/
[`IssuesEvent`]: https://developer.github.com/v3/activity/events/types/#issuesevent

[v0.1.0]: https://github.com/CodeLenny/arbitrary-gh-webhook/tree/v0.1.0

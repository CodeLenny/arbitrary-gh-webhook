# Arbitrary GitHub Webhooks

QuickCheck data for GitHub Webhooks.

## Example Usage

Want semi-random [`IssuesEvent`](https://developer.github.com/v3/activity/events/types/#issuesevent) webhooks
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
  ], (issueData) => {
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
  ], (issueData) => {
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
  ], (issueData) => {
    t.is(issueHasLabels(issueData), true);
  }
);
```

[QuickCheck]: https://en.wikipedia.org/wiki/QuickCheck
[JSVerify]: https://github.com/jsverify/jsverify
[AVA]: https://github.com/avajs/ava
[ConfigurableArbitrary]: https://github.com/rweda/configurable-arbitrary
[`ava-verify`]: https://www.npmjs.com/package/ava-verify

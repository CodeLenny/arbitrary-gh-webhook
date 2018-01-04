# Arbitrary GitHub Webhooks

QuickCheck data for GitHub Webhooks.

## Example Usage

Want semi-random [`IssuesEvent`](https://developer.github.com/v3/activity/events/types/#issuesevent) webhooks
to test a `issueHasLabels` function?

```js
const jsc = require("jsverify");
jsc.ava = require("ava-verify");
const arrayRange = require("jsverify-array-range");

const ArbitraryIssuesHook = require("arbitrary-gh-webhook/hooks/ArbitraryIssuesHook");
const WebhookIssue = require("arbitrary-gh-webhook/data/Issue");
const WebhookLabel = require("arbitrary-gh-webhook/data/Label");

const issueHasLabels = require("../issueHasLabels");

jsc.ava({
    suite: "issueHasLabels returns a boolean",
  }, [
    ArbitraryIssuesHook.build(),
  ], (issueData) => {
    t.is(typeof issueHasLabels(issueData), "boolean");
  }
);

jsc.ava({
    suite: "issueHasLabels returns 'false' if Issue has 0 labels",
  }, [
    ArbitraryIssuesHook.build({
      issue: WebhookIssue.build({
        labels: jsc.constant([]),
      }),
    }),
  ], (issueData) => {
    t.is(issueHasLabels(issueData), false);
  }
);

jsc.ava({
    suite: "issueHasLabels returns 'true' if Issue has 1+ labels",
  }, [
    ArbitraryIssuesHook.build({
      issue: WebhookIssue.build({
        labels: arrayRange(WebhookLabel.build(), 1),
      }),
    }),
  ], (issueData) => {
    t.is(issueHasLabels(issueData), true);
  }
);
```
(Tests are written using  [AVA][] through the [`ava-verify`][] library.  [`jsverify-array-range`][] is used to simplify creating an array with a desired length.)

[JSVerify]: https://github.com/jsverify/jsverify
[AVA]: https://github.com/avajs/ava
[`ava-verify`]: https://www.npmjs.com/package/ava-verify
[`jsverify-array-range`]: https://github.com/rweda/jsverify-array-range

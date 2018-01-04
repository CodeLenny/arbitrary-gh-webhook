const jsc = require("jsverify");
jsc.ava = require("ava-verify");
const uniq = require("lodash.uniq");

const WebhookLabel = require("data/WebhookLabel");
const WebhookLabelList = require("data/WebhookLabelList");

jsc.ava(
  {
    suite: "doesn't include duplicate IDs if 'uniqueID = true'",
  },
  [
    WebhookLabelList.build({
      uniqueID: jsc.constant(true),
      label: WebhookLabel.build({
        id: jsc.oneof([ jsc.constant(0), jsc.constant(1) ]),
      }),
    }),
  ],
  (t, list) => {
    t.plan(1);
    const ids = list.map(label => label.id);
    t.is(uniq(ids).length, ids.length);
  }
);

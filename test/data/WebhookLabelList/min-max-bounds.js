const jsc = require("jsverify");
jsc.ava = require("ava-verify");
const uniq = require("lodash.uniq");

const WebhookLabelList = require("data/WebhookLabelList");

const min = 5;
const max = 10;

jsc.ava(
  {
    suite: "produces between 'min' and 'max' entries",
  },
  [
    WebhookLabelList.build({
      min,
      max,
    }),
  ],
  (t, list) => {
    t.plan(2);
    t.true(list.length >= min);
    t.true(list.length <= max);
  }
);

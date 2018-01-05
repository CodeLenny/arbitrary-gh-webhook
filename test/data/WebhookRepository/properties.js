const jsc = require("jsverify");
jsc.ava = require("ava-verify");

const WebhookRepository = require("data/WebhookRepository");

jsc.ava({
  suite: "chooses IDs",
}, [ WebhookRepository.build() ], (t, repo) => {
  t.plan(1);
  t.is(typeof repo.id, "number");
});

jsc.ava({
  suite: "computes 'url' field",
}, [ WebhookRepository.build() ], (t, repo) => {
  t.plan(1);
  t.is(repo.html_url, `https://github.com/${repo.full_name}`);
});

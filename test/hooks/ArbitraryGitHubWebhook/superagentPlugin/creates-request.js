const test = require("ava");
const jsc = require("jsverify");
jsc.ava = require("ava-verify");
const sinon = require("sinon");
const express = require("express");
const request = require("supertest");

const ArbitraryGitHubWebhook = require("hooks/ArbitraryGitHubWebhook");

test.beforeEach("creates Express server", t => {
  const app = express();
  const appRequest = sinon.spy();
  app.use("/", (req, res) => {
    appRequest(req, res);
    res.send("OK");
  });
  t.context.app = app;
  t.context.appRequest = appRequest;
});

jsc.ava(
  {
    suite: "makes requests to express via supertest",
    runs: 20,
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  async (t, webhook) => {
    const { app, appRequest } = t.context;
    t.plan(2);
    await request(app)
      .post("/")
      .use(webhook.superagent)
      .then(res => t.is(res.status, 200));
    t.true(appRequest.calledOnce);
  }
);

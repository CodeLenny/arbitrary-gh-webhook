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
    suite: "sets 'X-Github-Delivery' header",
    runs: 20,
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  async (t, webhook) => {
    const { app, appRequest } = t.context;
    t.plan(1);
    await request(app).post("/").use(webhook.superagent);
    const [ req, res ] = appRequest.getCall(0).args;
    t.is(typeof req.headers["x-github-delivery"], "string");
  }
);

jsc.ava(
  {
    suite: "sets 'X-GitHub-Event' header",
    runs: 10,
  },
  [
    ArbitraryGitHubWebhook.build({
      event: jsc.constant("foo"),
    }),
  ],
  async (t, webhook) => {
    const { app, appRequest } = t.context;
    t.plan(1);
    await request(app).post("/").use(webhook.superagent);
    const [ req, res ] = appRequest.getCall(0).args;
    t.is(req.headers["x-github-event"], "foo");
  }
);

jsc.ava(
  {
    suite: "sets 'User-Agent' header",
    runs: 10,
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  async (t, webhook) => {
    const { app, appRequest } = t.context;
    t.plan(1);
    await request(app).post("/").use(webhook.superagent);
    const [ req, res ] = appRequest.getCall(0).args;
    t.is(req.headers["user-agent"].indexOf("GitHub-Hookshot/"), 0);
  }
);

jsc.ava(
  {
    suite: "sets 'Content-Type' header",
    runs: 10,
  },
  [
    ArbitraryGitHubWebhook.build(),
  ],
  async (t, webhook) => {
    const { app, appRequest } = t.context;
    t.plan(1);
    await request(app).post("/").use(webhook.superagent);
    const [ req, res ] = appRequest.getCall(0).args;
    t.is(req.headers["content-type"], "application/json");
  }
);

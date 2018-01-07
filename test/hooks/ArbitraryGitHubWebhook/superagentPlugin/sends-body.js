const test = require("ava");
const jsc = require("jsverify");
jsc.ava = require("ava-verify");
const sinon = require("sinon");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("supertest");

const ArbitraryIssuesEvent = require("hooks/ArbitraryIssuesEvent");

test.beforeEach("creates Express server", t => {
  const app = express();
  const appRequest = sinon.spy();
  app.use(bodyParser.json());
  app.use("/", (req, res) => {
    appRequest(req, res);
    res.send("OK");
  });
  t.context.app = app;
  t.context.appRequest = appRequest;
});

jsc.ava(
  {
    suite: "sends a body",
    runs: 20,
  },
  [
    ArbitraryIssuesEvent.build(),
  ],
  async (t, webhook) => {
    const { app, appRequest } = t.context;
    t.plan(4);
    await request(app)
      .post("/")
      .use(webhook.superagent)
      .then(res => t.is(res.status, 200));
    t.true(appRequest.calledOnce);
    const body = appRequest.getCall(0).args[0].body;
    t.is(typeof body, "object");
    t.is(typeof body.action, "string");
  }
);

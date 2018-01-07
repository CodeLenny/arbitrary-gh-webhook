const ArbitraryGitHubWebhook = require("./ArbitraryGitHubWebhook");
const jsc = require("jsverify");

const WebhookIssue = require("../data/WebhookIssue");
const WebhookRepository = require("../data/WebhookRepository");
const WebhookUser = require("../data/WebhookUser");
const WebhookOrganization = require("../data/WebhookOrganization");

module.exports = class ArbitraryIssuesEvent extends ArbitraryGitHubWebhook {

  static get opts() {
    return {

      event: jsc.constant("issues"),

      action: null,

      issue: null,

      repository: null,

      sender: null,

      organization: null,

    };
  }

  static spec(opts) {
    return {

      //event: e => this.defaultArbitrary(e, jsc.constant("issues")),

      action: a => this.defaultArbitrary(a, this.actions()),

      issue: i => this.defaultArbitrary(i, WebhookIssue.build()),

      repository: r => this.defaultArbitrary(r, WebhookRepository.build()),

      sender: s => this.defaultArbitrary(s, WebhookUser.build()),

      organization: o => this.defaultArbitrary(o, jsc.oneof([
        jsc.constant(null),
        WebhookOrganization.build(),
      ])),

    };
  }

  static actions() {
    return jsc.oneof([
      "assigned",
      "unassigned",
      "labeled",
      "unlabeled",
      "opened",
      "edited",
      "milestoned",
      "demilestoned",
      "closed",
      "reopened",
    ].map(jsc.constant));
  }

  static body(opts) {
    const body = {
      action: opts.action,
      issue: opts.issue,
      repository: opts.repository,
      sender: opts.sender,
    };
    if(opts.organization !== null) {
      body.organization = opts.organization;
    }
    return body;
  }

}

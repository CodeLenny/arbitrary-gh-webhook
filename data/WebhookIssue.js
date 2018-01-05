const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");

const GitHubID = require("./GitHubID");
const GitHubUsername = require("./GitHubUsername");
const GitHubTime = require("./GitHubTime");
const WebhookUser = require("./WebhookUser");
const WebhookLabelList = require("./WebhookLabelList");
const WebhookMilestone = require("./WebhookMilestone");

module.exports = class WebhookIssue extends ConfigurableArbitrary {

  static get opts() {
    return {

      owner: null,

      repo: null,

      id: null,

      number: null,

      title: null,

      body: null,

      user: null,

      labels: null,

      state: null,

      locked: null,

      assignee: null,

      milestone: null,

      comments: null,

      created_at: null,

      updated_at: null,

      closed_at: null,

    };
  }

  static spec(opts) {
    return {

      owner: owner => this.defaultArbitrary(owner, GitHubUsername()),

      repo: repo => this.defaultArbitrary(repo, GitHubUsername()),

      id: id => this.defaultArbitrary(id, GitHubID()),

      number: number => this.defaultArbitrary(number, jsc.integer),

      title: title => this.defaultArbitrary(title, jsc.string),

      body: body => this.defaultArbitrary(body, jsc.string),

      user: user => this.defaultArbitrary(user, WebhookUser.build()),

      labels: labels => this.defaultArbitrary(labels, WebhookLabelList.build()),

      state: state => this.defaultArbitrary(state, this.state()),

      locked: locked => this.defaultArbitrary(locked, jsc.bool),

      assignee: assignee => this.defaultArbitrary(assignee, jsc.oneof([
        jsc.constant(null),
        WebhookUser.build(),
      ])),

      milestone: milestone => this.defaultArbitrary(milestone, jsc.oneof([
        jsc.constant(null),
        WebhookMilestone.build(),
      ])),

      comments: comments => this.defaultArbitrary(comments, jsc.integer),

      created_at: d => this.defaultArbitrary(d, GitHubTime()),

      updated_at: d => this.defaultArbitrary(d, GitHubTime()),

      closed_at: d => this.defaultArbitrary(d, jsc.oneof([
        jsc.constant(null),
        GitHubTime(),
      ])),

    };
  }

  static transform(arb) {
    return this.smapobj(arb, opts => {
      return {
        url: `https://api.github.com/repos/${opts.owner}/${opts.repo}/issues/${opts.number}`,
        labels_url: `https://api.github.com/repos/${opts.owner}/${opts.repo}/issues/${opts.number}/labels{/name}`,
        comments_url: `https://api.github.com/repos/${opts.owner}/${opts.repo}/issues/${opts.number}/comments`,
        events_url: `https://api.github.com/repos/${opts.owner}/${opts.repo}/issues/${opts.number}/events`,
        html_url: `https://github.com/${opts.owner}/${opts.repo}/issues/${opts.number}`,
        id: opts.id,
        number: opts.number,
        title: opts.title,
        user: opts.user,
        labels: opts.labels,
        state: opts.state,
        locked: opts.locked,
        assignee: opts.assignee,
        milestone: opts.milestone,
        comments: opts.comments,
        created_at: opts.created_at,
        updated_at: opts.updated_at,
        closed_at: opts.closed_at,
        body: opts.body,
      }
    });
  }

  static state() {
    return jsc.oneof([ "open", "closed" ].map(jsc.constant));
  }

}

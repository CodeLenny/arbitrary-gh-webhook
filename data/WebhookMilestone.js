const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");

const GitHubID = require("./GitHubID");
const GitHubTime = require("./GitHubTime");
const WebhookUser = require("./WebhookUser");

module.exports = class WebhookMilestone extends ConfigurableArbitrary {

  static get opts() {
    return {

      owner: null,

      repo_name: null,

      id: null,

      number: null,

      title: null,

      description: null,

      creator: null,

      open_issues: null,

      closed_issues: null,

      state: null,

      created_at: null,

      updated_at: null,

      due_on: null,

      closed_at: null,

    };
  }

  static spec(opts) {
    return {

      owner: owner => this.defaultArbitrary(owner, jsc.string),

      repo_name: name => this.defaultArbitrary(name, jsc.string),

      id: id => this.defaultArbitrary(id, GitHubID()),

      number: number => this.defaultArbitrary(number, jsc.integer),

      title: title => this.defaultArbitrary(title, jsc.string),

      description: description => this.defaultArbitrary(description, jsc.string),

      creator: creator => this.defaultArbitrary(creator, WebhookUser.build()),

      open_issues: num => this.defaultArbitrary(num, jsc.integer),

      closed_issues: num => this.defaultArbitrary(num, jsc.integer),

      state: state => this.defaultArbitrary(state, this.state()),

      created_at: d => this.defaultArbitrary(d, GitHubTime()),

      updated_at: d => this.defaultArbitrary(d, GitHubTime()),

      due_on: d => this.defaultArbitrary(d, jsc.oneof([ jsc.constant(null), GitHubTime() ])),

      closed_at: d => this.defaultArbitrary(d, jsc.oneof([ jsc.constant(null), GitHubTime() ])),

    };
  }

  static transform(arb) {
    return this.smapobj(arb, opts => {
      return {
        url: `https://api.github.com/repos/${opts.owner}/${opts.repo}/milestones/${opts.number}`,
        html_url: `https://github.com/${opts.owner}/${opts.repo}/milestone/${opts.number}`,
        labels_url: `https://api.github.com/repos/${opts.owner}/${opts.repo}/milestones/${opts.number}/labels`,
        id: opts.id,
        number: opts.number,
        title: opts.title,
        description: opts.description,
        creator: opts.creator,
        open_issues: opts.open_issues,
        closed_issues: opts.closed_issues,
        state: opts.state,
        created_at: opts.created_at,
        updated_at: opts.updated_at,
        due_on: opts.due_on,
        closed_at: opts.closed_at,
      };
    });
  }

  static state() {
    return jsc.oneof([ "open", "closed" ].map(jsc.constant));
  }

}

const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");

const GitHubID = require("./GitHubID");
const GitHubUsername = require("./GitHubUsername");

module.exports = class WebhookLabel extends ConfigurableArbitrary {

  static get opts() {
    return {

      id: null,

      login: null,

      avatar_url: null,

      gravatar_id: null,

      type: null,

      site_admin: null,

    };
  }

  static spec(opts) {
    return {

      id: id => this.defaultArbitrary(id, GitHubID()),

      login: login => this.defaultArbitrary(login, GitHubUsername()),

      avatar_url: url => this.defaultArbitrary(url, jsc.string),

      gravatar_id: id => this.defaultArbitrary(id, jsc.oneof( jsc.constant(null), jsc.string )),

      type: type => this.defaultArbitrary(type, jsc.constant("User")),

      site_admin: admin => this.defaultArbitrary(admin, jsc.boolean),

    };
  }

  static transform(arb) {
    return this.smapobj(arb, opts => {
      return {
        id: opts.id,
        login: opts.login,
        avatar_url: opts.avatar_url,
        gravatar_id: opts.gravatar_id,
        type: opts.type,
        site_admin: opts.site_admin,
        url: `https://api.github.com/users/${opts.login}`,
        html_url: `https://github.com/${opts.login}`,
        followers_url: `https://api.github.com/users/${opts.login}/followers`,
        following_url: `https://api.github.com/users/${opts.login}/following{/other_user}`,
        gists_url: `https://api.github.com/users/${opts.login}/gists{/gist_id}`,
        starred_url: `https://api.github.com/users/${opts.login}/starred{/owner}{/repo}`,
        subscriptions_url: `https://api.github.com/users/${opts.login}/subscriptions`,
        organizations_url: `https://api.github.com/users/${opts.login}/orgs`,
        repos_url: `https://api.github.com/users/${opts.login}/repos`,
        events_url: `https://api.github.com/users/${opts.login}/events{/privacy}`,
        received_events_url: `https://api.github.com/users/${opts.login}/received_events`,
      };
    });
  }

}

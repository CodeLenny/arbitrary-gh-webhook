const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");

const GitHubID = require("./GitHubID");
const GitHubTime = require("./GitHubTime");
const GitHubUsername = require("./GitHubUsername");
const WebhookUser = require("./WebhookUser");
const WebhookOrganization = require("./WebhookOrganization");

module.exports = class WebhookRepository extends ConfigurableArbitrary {

  static get opts() {
    return {

      id: null,

      name: null,

      owner: null,

      private: null,

      description: null,

      fork: null,

      homepage: null,

      size: null,

      stargazers_count: null,

      watchers_count: null,

      language: null,

      has_issue: null,

      has_downloads: null,

      has_wiki: null,

      has_pages: null,

      forks_count: null,

      mirror_url: null,

      open_issues_count: null,

      forks: null,

      open_issues: null,

      watchers: null,

      default_branch: null,

      created_at: null,

      updated_at: null,

      pushed_at: null,

    };
  }

  static spec(opts) {
    return {

      id: id => this.defaultArbitrary(id, GitHubID()),

      name: name => this.defaultArbitrary(name, GitHubUsername()),

      owner: owner => this.defaultArbitrary(owner, jsc.oneof([
        WebhookUser.build(),
        WebhookOrganization.build(),
      ])),

      private: b => this.defaultArbitrary(b, jsc.bool),

      description: s => this.defaultArbitrary(s, jsc.oneof([
        jsc.constant(null),
        jsc.nestring,
      ])),

      fork: b => this.defaultArbitrary(b, jsc.bool),

      homepage: s => this.defaultArbitrary(s, jsc.oneof([
        jsc.constant(null),
        jsc.nestring,
      ])),

      size: i => this.defaultArbitrary(i, jsc.integer),

      stargazers_count: i => this.defaultArbitrary(i, jsc.integer),

      watchers_count: i => this.defaultArbitrary(i, jsc.integer),

      language: l => this.defaultArbitrary(l, jsc.constant(null)),

      has_issues: b => this.defaultArbitrary(b, jsc.bool),

      has_downloads: b => this.defaultArbitrary(b, jsc.bool),

      has_wiki: b => this.defaultArbitrary(b, jsc.bool),

      has_pages: b => this.defaultArbitrary(b, jsc.bool),

      forks_count: i => this.defaultArbitrary(i, jsc.integer),

      mirror_url: url => this.defaultArbitrary(url, jsc.constant(null)),

      open_issues_count: i => this.defaultArbitrary(i, jsc.integer),

      forks: i => this.defaultArbitrary(i, jsc.integer),

      open_issues: i => this.defaultArbitrary(i, jsc.integer),

      watchers: i => this.defaultArbitrary(i, jsc.integer),

      default_branch: b => this.defaultArbitrary(b, jsc.oneof([
        jsc.constant("master"),
        jsc.nestring,
      ])),

      created_at: d => this.defaultArbitrary(d, GitHubTime()),

      updated_at: d => this.defaultArbitrary(d, GitHubTime()),

      pushed_at: d => this.defaultArbitrary(d, jsc.oneof([ jsc.constant(null), GitHubTime() ])),

    };
  }

  static transform(arb) {
    return this.smapobj(arb, opts => {
      return {
        id: opts.id,
        name: opts.name,
        full_name: `${opts.owner.login}/${opts.name}`,
        owner: opts.owner,
        private: opts.private,
        html_url: `https://github.com/${opts.owner.login}/${opts.name}`,
        description: opts.description,
        fork: opts.fork,
        url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}`,
        forks_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/forks`,
        keys_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/keys{/key_id}`,
        collaborators_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/collaborators{/collaborator}`,
        teams_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/teams`,
        hooks_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/hooks`,
        issue_events_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/issues/events{/number}`,
        events_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/events`,
        assignees_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/assignees{/user}`,
        branches_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/branches{/branch}`,
        tags_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/tags`,
        blobs_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/git/blobs{/sha}`,
        git_tags_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/git/tags{/sha}`,
        git_refs_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/git/refs{/sha}`,
        trees_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/git/trees{/sha}`,
        statuses_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/statuses/{sha}`,
        languages_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/languages`,
        stargazers_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/stargazers`,
        contributors_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/contributors`,
        subscribers_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/subscribers`,
        subscription_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/subscription`,
        commits_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/commits{/sha}`,
        git_commits_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/git/commits{/sha}`,
        comments_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/comments{/number}`,
        issue_comment_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/issues/comments{/number}`,
        contents_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/contents/{+path}`,
        compare_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/compare/{base}...{head}`,
        merges_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/merges`,
        archive_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/{archive_format}{/ref}`,
        downloads_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/downloads`,
        issues_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/issues{/number}`,
        pulls_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/pulls{/number}`,
        milestones_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/milestones{/number}`,
        notifications_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/notifications{?since,all,participating}`,
        labels_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/labels{/name}`,
        releases_url: `https://api.github.com/repos/${opts.owner.login}/${opts.name}/releases{/id}`,
        created_at: opts.created_at,
        updated_at: opts.updated_at,
        pushed_at: opts.pushed_at,
        git_url: `git://github.com/${opts.owner.login}/${opts.name}.git`,
        ssh_url: `git@github.com:${opts.owner.login}/${opts.name}.git`,
        clone_url: `https://github.com/${opts.owner.login}/${opts.name}.git`,
        svn_url: `https://github.com/${opts.owner.login}/${opts.name}`,
        homepage: opts.homepage,
        size: opts.size,
        stargazers_count: opts.stargazers_count,
        watchers_count: opts.watchers_count,
        language: opts.language,
        has_issues: opts.has_issue,
        has_downloads: opts.has_downloads,
        has_wiki: opts.has_wiki,
        has_pages: opts.has_pages,
        forks_count: opts.forks_count,
        mirror_url: opts.mirror_url,
        open_issues_count: opts.open_issues_count,
        forks: opts.forks,
        open_issues: opts.open_issues,
        watchers: opts.watchers,
        default_branch: opts.default_branch,
      };
    });
  }

}

module.exports = class ArbitraryGitHubWebhooks {

  static get GitHubID() {
    return require("data/GitHubID");
  }

  static get WebhookLabel() {
    return require("data/WebhookLabel");
  }

  static get WebhookLabelList() {
    return require("data/WebhookLabelList");
  }

};

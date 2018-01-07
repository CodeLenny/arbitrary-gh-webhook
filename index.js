module.exports = class ArbitraryGitHubWebhooks {

  static get GitHubID() {
    return require("./data/GitHubID");
  }

  static get GitHubTime() {
    return require("./data/GitHubTime");
  }

  static get GitHubUsername() {
    return require("./data/GitHubUsername");
  }

  static get WebhookIssue() {
    return require("./data/WebhookIssue");
  }

  static get WebhookLabel() {
    return require("./data/WebhookLabel");
  }

  static get WebhookLabelList() {
    return require("./data/WebhookLabelList");
  }

  static get WebhookMilestone() {
    return require("./data/WebhookMilestone");
  }

  static get WebhookOrganization() {
    return require("./data/WebhookOrganization");
  }

  static get WebhookRepository() {
    return require("./data/WebhookRepository");
  }

  static get WebhookUser() {
    return require("./data/WebhookUser");
  }

  static get ArbitraryGitHubWebhook() {
    return require("./hooks/ArbitraryGitHubWebhook");
  }

  static get ArbitraryIssuesEvent() {
    return require("./hooks/ArbitraryIssuesEvent");
  }

};

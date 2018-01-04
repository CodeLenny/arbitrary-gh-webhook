const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");

const GitHubID = require("./GitHubID");

module.exports = class WebhookLabel extends ConfigurableArbitrary {

  static get opts() {
    return {

      id: null,

      url: null,

      name: null,

      color: null,

      default: null,

    };
  }

  static spec(opts) {
    return {

      id: id => this.defaultArbitrary(id, GitHubID()),

      url: url => this.defaultArbitrary(url, jsc.string),

      name: name => this.defaultArbitrary(name, jsc.string),

      color: color => this.defaultArbitrary(color, jsc.string),

      default: d => this.defaultArbitrary(d, jsc.bool),

    };
  }

}

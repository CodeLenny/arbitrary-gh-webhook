const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");

module.exports = class ArbitraryGitHubWebhook extends ConfigurableArbitrary {

  static get opts() {
    return {

      event: null,

      delivery: null,

      secret: null,

    };
  }

  static spec(opts) {
    return {

      delivery: i => this.defaultArbitrary(i, jsc.integer),

      secret: s => this.defaultArbitrary(s, jsc.string),

    };
  }

  static transform(arb) {
    return this.smapobj(arb, opts => {
      const body = this.body(opts);
      return {
        body,
      };
    });
  }

  static body(opts) {
    return {};
  }

}

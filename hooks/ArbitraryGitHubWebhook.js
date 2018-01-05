const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");
const crypto = require("crypto");

module.exports = class ArbitraryGitHubWebhook extends ConfigurableArbitrary {

  static get opts() {
    return {

      useSecret: null,

      event: null,

      userAgentCode: null,

      delivery: null,

      secret: null,

    };
  }

  static spec(opts) {
    return {

      useSecret: b => this.defaultArbitrary(
        b,
        typeof opts.useSecret === "boolean" ? jsc.constant(opts.useSecret) : jsc.bool
      ),

      userAgentCode: c => this.defaultArbitrary(c, jsc.integer(16777216, 268435455)),

      delivery: i => this.defaultArbitrary(i, jsc.integer),

      secret: s => this.defaultArbitrary(s, jsc.nestring),

    };
  }

  static transform(arb) {
    return this.smapobj(arb, opts => {
      const body = this.body(opts);
      const headers = this.headers(opts, body);
      const output = {
        useSecret: opts.useSecret,
        body,
        headers,
      };
      if(opts.useSecret) {
        output.secret = opts.secret;
      }
      return output;
    });
  }

  static headers(opts, body) {
    const headers = {
      "X-Github-Delivery": opts.delivery,
      "X-GitHub-Event": opts.event,
      "User-Agent": `GitHub-Hookshot/${opts.userAgentCode.toString(16)}`,
      "Content-Type": "application/json",
    };
    if(opts.useSecret) {
      const signature = "sha1=" + crypto.createHmac("sha1", opts.secret).update(JSON.stringify(body)).digest("hex");
      headers["X-Hub-Signature"] = signature;
    }
    return headers;
  }

  static body(opts) {
    return {};
  }

}

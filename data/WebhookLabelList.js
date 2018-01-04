const ConfigurableArbitrary = require("configurable-arbitrary");
const jsc = require("jsverify");
const arrayRange = require("jsverify-array-range");

const WebhookLabel = require("./WebhookLabel");

module.exports = class WebhookLabelList extends ConfigurableArbitrary {

  static get opts() {
    return {

      uniqueID: null,

      label: WebhookLabel.build(),

      altID: jsc.integer,

      min: 0,

      max: 30,

      labels: null,

      replacementIDs: null,

    };
  }

  static spec(opts) {
    return {

      uniqueID: uniqueID => this.defaultArbitrary(uniqueID, jsc.bool),

      labels: labels => this.defaultArbitrary(labels, arrayRange(opts.label.generator, opts.min, opts.max)),

      replacementIDs: ids => this.defaultArbitrary(ids, arrayRange(opts.altID, opts.max, opts.max * 2)),

    };
  }

  static transform(arb) {
    return this.smapobj(arb, opts => {
      if(!opts.uniqueID) {
        return opts.labels;
      }
      return opts.labels
        .reduce(
          (acc, val) => {
            if(acc.ids.indexOf(val.id) !== -1) {
              const newID = opts.replacementIDs.filter(id => acc.ids.indexOf(id) === -1)[0];
              val.id = newID;
            }
            acc.ids.push(val.id);
            acc.labels.push(val);
            return acc;
          },
          { labels: [], ids: [] },
        )
        .labels;
    });
  }

}

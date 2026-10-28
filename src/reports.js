"use strict";

const _ = require("lodash");

const SUMMARY_TEMPLATE = "Patient <%= name %> has <%= count %> upcoming appointments.";

/**
 * One-sentence summary of a patient's upcoming appointments.
 * @param {string} name Patient name shown in the sentence.
 * @param {number} count How many appointments are coming up.
 * @returns {string}
 */
function appointmentSummary(name, count) {
  const render = _.template(SUMMARY_TEMPLATE);
  return render({ name: _.escape(name), count });
}

module.exports = { appointmentSummary };

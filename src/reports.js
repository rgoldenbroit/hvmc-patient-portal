"use strict";

const _ = require("lodash");

/**
 * One-sentence summary of a patient's upcoming appointments.
 * @param {string} name Patient name shown in the sentence.
 * @param {number} count How many appointments are coming up.
 * @returns {string}
 */
function appointmentSummary(name, count) {
  return `Patient ${_.escape(name)} has ${count} upcoming appointments.`;
}

module.exports = { appointmentSummary };

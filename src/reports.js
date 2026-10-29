"use strict";

const escape = require("lodash/escape");

/**
 * One-sentence summary of a patient's upcoming appointments.
 * @param {string} name Patient name shown in the sentence.
 * @param {number} count How many appointments are coming up.
 * @returns {string}
 */
function appointmentSummary(name, count) {
  const safeName = escape(name);
  return `Patient ${escape(safeName)} has ${escape(count)} upcoming appointments.`;
}

module.exports = { appointmentSummary };

"use strict";

const express = require("express");
const { issueToken, requireAuth } = require("./auth");
const { appointmentSummary } = require("./reports");

/** Upcoming visit dates, keyed by patient id. */
const APPOINTMENTS_BY_PATIENT = {
  p1: ["2026-11-02", "2026-11-09"],
};

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const id = req.body && req.body.id;
  const token = issueToken({ id, role: "patient" });
  res.json({ token });
});

app.get("/appointments", requireAuth, (req, res) => {
  const patientId = req.user.sub;
  const appointments = APPOINTMENTS_BY_PATIENT[patientId] || [];
  const summary = appointmentSummary(String(patientId), appointments.length);
  res.json({ appointments, summary });
});

module.exports = app;

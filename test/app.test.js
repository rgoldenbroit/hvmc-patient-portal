"use strict";

const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const request = require("supertest");
const app = require("../src/app");

describe("appointments", () => {
  it("returns 401 without a token", async () => {
    const response = await request(app).get("/appointments");

    assert.equal(response.status, 401);
    assert.deepEqual(response.body, { error: "unauthorized" });
  });

  it("returns 200 with 2 appointments and a summary for a valid token", async () => {
    const login = await request(app).post("/login").send({ id: "p1" });
    const response = await request(app)
      .get("/appointments")
      .set("Authorization", `Bearer ${login.body.token}`);

    assert.equal(response.status, 200);
    assert.deepEqual(response.body.appointments, ["2026-11-02", "2026-11-09"]);
    assert.match(response.body.summary, /2 upcoming/);
  });

  it("returns 401 for a tampered token", async () => {
    const login = await request(app).post("/login").send({ id: "p1" });
    const parts = String(login.body.token).split(".");
    parts[2] = "tampered-signature";
    const tampered = parts.join(".");

    const response = await request(app)
      .get("/appointments")
      .set("Authorization", `Bearer ${tampered}`);

    assert.equal(response.status, 401);
    assert.deepEqual(response.body, { error: "unauthorized" });
  });
});

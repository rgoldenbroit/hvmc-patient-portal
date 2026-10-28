"use strict";

const jwt = require("jsonwebtoken");

/** Signing key. Override with JWT_SECRET outside local development. */
const SECRET = process.env.JWT_SECRET || "dev-only-secret";

/**
 * Create a one-hour login token for a user.
 * @param {{ id: string, role: string }} user
 * @returns {string}
 */
function issueToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );
}

/**
 * Continue only when the request carries a valid Bearer token.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void}
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const match = typeof header === "string" ? header.match(/^Bearer\s+(\S+)\s*$/) : null;
  const token = match ? match[1] : "";

  if (!token) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "unauthorized" });
  }
}

module.exports = { issueToken, requireAuth };

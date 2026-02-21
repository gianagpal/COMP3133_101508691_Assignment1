const jwt = require("jsonwebtoken");

function requireAuth(token) {
  if (!token) throw new Error("Unauthorized: missing token");

  const raw = token.startsWith("Bearer ") ? token.slice(7) : token;

  try {
    return jwt.verify(raw, process.env.JWT_SECRET);
  } catch {
    throw new Error("Unauthorized: invalid token");
  }
}

module.exports = { requireAuth };

#!/usr/bin/env node
/**
 * Generates the scrypt hash for the control-panel password.
 *
 *   npm run hash-password -- "your-new-password"
 *
 * Copy the printed line into .env.local. The plaintext password is never
 * written anywhere — only the hash goes into the environment.
 */
import crypto from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash-password -- \"your-new-password\"");
  process.exit(1);
}

if (password.length < 10) {
  console.error("Choose a password of at least 10 characters.");
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(password, salt, 64);

console.log("\nAdd this to .env.local:\n");
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString("hex")}$${key.toString("hex")}`);
console.log(`ADMIN_SESSION_SECRET=${crypto.randomBytes(32).toString("hex")}\n`);

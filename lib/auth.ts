import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Admin authentication.
 *
 * Deliberately dependency-free — node:crypto only. The password is never
 * stored, only an scrypt hash held in the environment; the session is a
 * short HMAC-signed token in an httpOnly cookie.
 *
 * Set these in .env.local (see .env.example):
 *   ADMIN_PASSWORD_HASH   generate with `npm run hash-password -- "yourpassword"`
 *   ADMIN_SESSION_SECRET  any long random string
 */

export const SESSION_COOKIE = "agba_admin";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function sessionSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short. Set it in .env.local before deploying.",
    );
  }
  // Dev-only fallback so the panel is usable straight after `npm run dev`.
  return "agba-dev-only-session-secret-change-me";
}

/* ------------------------------------------------------------- password -- */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const salt = Buffer.from(parts[1], "hex");
  const expected = Buffer.from(parts[2], "hex");
  const actual = crypto.scryptSync(password, salt, expected.length);
  // Constant-time compare — never a plain ===.
  return (
    expected.length === actual.length &&
    crypto.timingSafeEqual(expected, actual)
  );
}

/** The configured admin hash, or null when the panel has not been set up. */
export function configuredHash(): string | null {
  return process.env.ADMIN_PASSWORD_HASH?.trim() || null;
}

/* -------------------------------------------------------------- session -- */

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("hex");
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 0) return false;

  const payload = token.slice(0, idx);
  const sig = token.slice(idx + 1);

  const expected = sign(payload);
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const exp = Number(payload.split(".")[1]);
  return Number.isFinite(exp) && exp > Date.now();
}

/* ------------------------------------------------- generic signed tokens -- */

/**
 * Used by the Downloads gate: once a visitor gives their name and email, a
 * signed cookie lets them fetch document files for the rest of the session,
 * without us storing anything beyond the lead record itself.
 */
export function createSignedToken(subject: string, ttlSeconds: number): string {
  const exp = Date.now() + ttlSeconds * 1000;
  const payload = `${subject}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySignedToken(
  token: string | undefined | null,
  subject: string,
): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 0) return false;

  const payload = token.slice(0, idx);
  if (!payload.startsWith(`${subject}.`)) return false;

  const sig = token.slice(idx + 1);
  const expected = sign(payload);
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const exp = Number(payload.slice(subject.length + 1));
  return Number.isFinite(exp) && exp > Date.now();
}

export const DOWNLOAD_COOKIE = "agba_dl";
export const DOWNLOAD_SUBJECT = "download";
export const DOWNLOAD_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function hasDownloadAccess(): Promise<boolean> {
  const jar = await cookies();
  return verifySignedToken(jar.get(DOWNLOAD_COOKIE)?.value, DOWNLOAD_SUBJECT);
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

/**
 * Guard for admin pages — redirects to the login screen when unauthenticated.
 * Used by app/admin/(panel)/layout.tsx so every panel route is covered by
 * one check rather than each page remembering to do it.
 */
export async function requireAdmin() {
  if (!(await isAuthed())) redirect("/admin/login");
}

/** Guard for admin API routes — returns a 401 Response, or null when allowed. */
export async function requireAdminApi(): Promise<Response | null> {
  if (await isAuthed()) return null;
  return Response.json({ error: "Unauthorised" }, { status: 401 });
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
} as const;

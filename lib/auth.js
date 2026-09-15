import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const AUTH_COOKIE_NAME = "skynex_admin_token";

function requireSecret() {
  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not set. Copy .env.example to .env and set a real secret."
    );
  }
  return JWT_SECRET;
}

/** Hash a plaintext password for storage. */
export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

/** Compare a plaintext password against a stored hash. */
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/** Sign a JWT for the given admin. */
export function signToken(admin) {
  return jwt.sign(
    { sub: admin.id, username: admin.username, email: admin.email },
    requireSecret(),
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/** Verify a JWT, returning its decoded payload or null if invalid/expired. */
export function verifyToken(token) {
  try {
    return jwt.verify(token, requireSecret());
  } catch {
    return null;
  }
}

/**
 * Server-side helper (Route Handlers / Server Components) that reads the
 * auth cookie and returns the decoded admin payload, or null if the
 * request isn't authenticated.
 */
export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Verify a token pulled directly from a NextRequest (used in middleware,
 * which runs on the Edge runtime and doesn't have access to next/headers'
 * cookies() the same way route handlers do).
 */
export function verifyRequestToken(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

import jwt from "jsonwebtoken";
import { TokenPayload } from "../../types/auth.types";

const secret = process.env.JWT_SECRET as jwt.Secret;

//token generation for verification of email/account
//To stay logged In for the user
export const generateLongVerificationToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
  return token;
};
export const longLivedCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production", // secure in prod only
  maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};



//Short token for otp/forget-password verification
export const generateShortVerificationToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "30m",
  });
  return token;
};
export const shortLivedCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 30 * 60 * 1000, // 30 minutes
};
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import mongoose, { Types } from "mongoose";
import { randomUUID } from "crypto";

import { User } from "../models/user.model";
import { Otp } from "../models/otp.model";
import { RefreshTokenModel } from "../models/refreshToken.model";

import { ApiError } from "../utils/apiResponseHandler/apiError";
import { AUTH_MESSAGES, USER_MESSAGES } from "../utils/constants";
import { redisClient } from "../config/redis.config";

import {
  DeviceMeta,
  RegisterUserInput,
  TokenPayload,
} from "../types/auth.types";

import {
  generateVerificationToken,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/helper/generateVerifyJwtToken";

export const registerNewUser = async ({
  userName,
  email,
  password,
}: RegisterUserInput) => {
  if (await User.findOne({ email }))
    throw ApiError.Conflict(USER_MESSAGES.EMAIL_EXISTS);

  if (await User.findOne({ userName }))
    throw ApiError.Conflict(USER_MESSAGES.USERNAME_EXISTS);

  const hash = await bcrypt.hash(password, 10);
  const profileImage = `https://api.dicebear.com/9.x/initials/svg?seed=${email[0]}&radius=50`;

  const user = await User.create({
    userName,
    email,
    password: hash,
    profileImage,
  });

  const tokenPayload: TokenPayload = { id: user._id };
  const token = generateVerificationToken(tokenPayload);

  return { user, token };
};

export const handleSendOtp = async (
  userId: Types.ObjectId,
  email: string,
  userName: string
) => {
  const otpNumber = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  await Otp.create({ userId, otp: otpNumber });

  console.log("Generated OTP:", otpNumber); // Replace with email sending
};

export const handleVerifyOtp = async (userId: string, otpNumber: number) => {
  const user = await User.findById(userId);

  if (!user) throw ApiError.NotFound(USER_MESSAGES.NOT_FOUND);
  if (user.verified)
    throw ApiError.Conflict(AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED);

  const otp = await Otp.findOne({ userId }).sort({ createdAt: -1 });
  if (!otp || otp.otp !== otpNumber)
    throw ApiError.Forbidden(AUTH_MESSAGES.WRONG_OTP);

  user.verified = true;
  await user.save();

  const payload: TokenPayload = { id: user._id };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const handleResendOtp = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) throw ApiError.NotFound(USER_MESSAGES.NOT_FOUND);
  if (user.verified)
    throw ApiError.Conflict(AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED);

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  await Otp.create({ userId, otp });
  console.log("Resent OTP:", otp);
};

export const handleUserLogin = async (
  usernameOrEmail: string,
  password: string,
  meta: DeviceMeta
) => {
  const query = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail)
    ? { email: usernameOrEmail }
    : { userName: usernameOrEmail };

  const user = await User.findOne(query).select("+password");
  if (!user) throw ApiError.NotFound(USER_MESSAGES.NOT_FOUND);

  if (!(await bcrypt.compare(password, user.password)))
    throw ApiError.Unauthorized(AUTH_MESSAGES.INVALID_PASSWORD);

  const sessionId = randomUUID();
  const payload: TokenPayload = { id: user._id };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const decoded: any = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!
  );

  const tokenDoc = await RefreshTokenModel.create({
    userId: user._id,
    token: refreshToken,
    sessionId,
    deviceName: meta.deviceName,
    ipAddress: meta.ipAddress,
    broswerInfo: meta.broswerInfo,
    osInfo: meta.osInfo,
    userAgent: meta.userAgent,
    revoked: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await redisClient.setEx(
    `session:${sessionId}`,
    Math.floor((decoded.exp * 1000 - Date.now()) / 1000) > 0
      ? Math.floor((decoded.exp * 1000 - Date.now()) / 1000)
      : 60,
    JSON.stringify({
      userId: user._id.toString(),
      tokenId: tokenDoc._id.toString(),
    })
  );

  return { accessToken, refreshToken };
};

export async function verifyAndRotateRefreshToken(oldToken: string) {
  const secret = process.env.JWT_REFRESH_SECRET!;
  let payload: any;

  try {
    payload = verifyToken(oldToken, secret);
  } catch {
    throw ApiError.Unauthorized(AUTH_MESSAGES.INVALID_OR_EXPIRED_REFRESH_TOKEN);
  }

  const tokenRecord = await RefreshTokenModel.findOne({
    token: oldToken,
    revoked: false,
    expiresAt: { $gt: new Date() },
  });

  if (!tokenRecord) {
    throw ApiError.Unauthorized(AUTH_MESSAGES.INVALID_OR_EXPIRED_REFRESH_TOKEN);
  }

  tokenRecord.revoked = true;
  await tokenRecord.save();

  const newAccessToken = generateAccessToken({ id: payload.id });
  const newRefreshToken = generateRefreshToken({ id: payload.id });

  await RefreshTokenModel.create({
    userId: payload.id,
    token: newRefreshToken,
    sessionId: tokenRecord.sessionId,
    deviceName: tokenRecord.deviceName,
    ipAddress: tokenRecord.ipAddress,
    osInfo: tokenRecord.osInfo,
    userAgent: tokenRecord.userAgent,
    revoked: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { newAccessToken, newRefreshToken };
}

export const handleLogout = async (userId: string) => {
  const activeTokens = await RefreshTokenModel.find({ userId });

  for (const t of activeTokens) {
    t.revoked = true;
    await t.save();
    await redisClient.del(`user:${userId}`);
    await redisClient.del(`session:${t.sessionId}`);
  }
};

export const handleSendPasswordResetEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.NotFound(USER_MESSAGES.NOT_FOUND);

  const token = generateVerificationToken({ id: user._id });
  user.verificationToken = token;
  await user.save();

  console.log("Password reset link:", token); // Replace with email
};

export const handleResetPassword = async (
  token: string,
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword)
    throw ApiError.BadRequest(AUTH_MESSAGES.INVALID_PASSWORD);

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const user = await User.findById(decoded.id);
  if (!user) throw ApiError.NotFound(USER_MESSAGES.NOT_FOUND);

  user.password = await bcrypt.hash(password, 10);
  await user.save();
};

export const getUserById = async (userId: string) => {
  const cached = await redisClient.get(`user:${userId}`);
  if (cached) return JSON.parse(cached);

  const user = await User.findById(userId).select("-password");
  if (!user) throw ApiError.NotFound(USER_MESSAGES.NOT_FOUND);

  await redisClient.setEx(`user:${userId}`, 1800, JSON.stringify(user));
  return user;
};

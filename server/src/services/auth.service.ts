import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

import mailSender from "../utils/email/mailSender";

import { Types } from "mongoose";
import { User } from "../models/user.model";
import { Otp } from "../models/otp.model";

import { ApiError } from "../utils/apiResponseHandler/apiError";
import {
  AUTH_MESSAGES,
  COMMON_MESSAGES,
  HTTP_STATUS,
  USER_MESSAGES,
} from "../utils/constants";
import { RegisterUserInput, TokenPayload } from "../types/auth.types";

import {
  generateLongVerificationToken,
  generateShortVerificationToken,
} from "../utils/helper/generateJwtToken";

export const registerNewUser = async ({
  userName,
  email,
  password,
}: RegisterUserInput) => {
  const isEmailAlreadyExists = await User.findOne({ email });
  if (isEmailAlreadyExists) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: USER_MESSAGES.EMAIL_ALREADY_IN_USE,
    });
  }

  const isUserNameAlreadyExists = await User.findOne({ userName: userName });

  if (isUserNameAlreadyExists) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: USER_MESSAGES.USERNAME_ALREADY_IN_USE,
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const firstLetter = email[0].toLowerCase();
  const dummyImageUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${firstLetter}&backgroundColor=ffcc00&textColor=000000&radius=50`;

  const user = await User.create({
    userName,
    email,
    password: encryptedPassword,
    profileImage: dummyImageUrl,
  });

  await user.save();

  // Short 30 minutes token to verify the user account;
  const tokenPayload: TokenPayload = {
    id: user._id,
  };
  const token = generateShortVerificationToken(tokenPayload);

  return { user, token };
};

export const handleSendOtp = async (
  userId: Types.ObjectId,
  email: string,
  userName: string
) => {
  const otpNumber = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  console.log("sent OTP : ", otpNumber);

  await Otp.create({
    userId: userId,
    otp: otpNumber,
  });

  const templatePath = path.join(
    __dirname,
    "..",
    "utils",
    "email",
    "templates",
    "sendOtp.html"
  );
  let html = fs
    .readFileSync(templatePath, "utf8")
    .replace(/{{otp}}/g, otpNumber)
    .replace(/{{userName}}/g, userName);
  await mailSender(email, "Your verification code", html);
};

export const handleVerifyOtp = async (userId: string, otpNumber: number) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    });
  }

  //If the email is verified, there's no need to proceed further to verify the account.
  if (user.verified) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: AUTH_MESSAGES.ALREADY_EMAIL_VERIFIED,
    });
  }

  //Fetch the latest OTP for the specified user ID
  const otp = await Otp.findOne({ userId: userId })
    .sort({ createdAt: -1 })
    .exec();

  // If no OTP is found:
  // This may happen if all OTPs have expired and were deleted from the database after 15 minutes.
  if (!otp) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: AUTH_MESSAGES.REQUEST_NEW_OTP,
    });
  }

  // get otpNumber from otp stored in database
  const latestOtp = otp.otp;

  if (latestOtp !== Number(otpNumber)) {
    throw new ApiError({
      status: HTTP_STATUS.FORBIDDEN,
      message: AUTH_MESSAGES.WRONG_OTP,
    });
  }
  await User.findByIdAndUpdate(userId, {
    verified: true,
    verificationToken: "",
  });

  const templatePath = path.join(
    __dirname,
    "..",
    "utils",
    "email",
    "templates",
    "welcomeEmail.html"
  );
  let html = fs
    .readFileSync(templatePath, "utf8")
    .replace(/{{userName}}/g, user.userName);
  await mailSender(user.email, "Welcome By Social Media", html);

  const payload: TokenPayload = {
    id: user._id,
  };

  const token = generateLongVerificationToken(payload);
  return token;
};

export const handleResendOtp = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    });
  }

  // If already account verified no need to re-send otp
  if (user.verified) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: AUTH_MESSAGES.ALREADY_EMAIL_VERIFIED,
    });
  }

  //Generate a 6 digit OTP number
  const otpNumber = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  console.log("Resent OTP : ", otpNumber);

  await Otp.create({
    userId: userId,
    otp: otpNumber,
  });

  const templatePath = path.join(
    __dirname,
    "..",
    "utils",
    "email",
    "templates",
    "resendOtp.html"
  );
  let html = fs
    .readFileSync(templatePath, "utf8")
    .replace(/{{otp}}/g, otpNumber)
    .replace(/{{userName}}/g, user.userName);
  await mailSender(user.email, "Your new verification code", html);
};

export const handleUserLogin = async (identifier: string, password: string) => {
  // Check if loginId is email
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  //Check if the provided identifier is an email or username
  const query = isEmail ? { email: identifier } : { userName: identifier };

  const user = await User.findOne(query, {
    email: 1,
    userName: 1,
    password: 1,
    _id: 1,
    image: 1,
  });

  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: AUTH_MESSAGES.INVALID_PASSWORD,
    });
  }

  const tokenPayload: TokenPayload = {
    // email: user.email,
    id: user._id,
    // role: user.accountType,
  };
  const token = generateLongVerificationToken(tokenPayload);

  user.password = "";
  return { token, user };
};

export const handleSendPasswordResetEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    });
  }

  const payload = {
    id: user._id,
    email: email,
  };
  const token = generateShortVerificationToken(payload);

  user.verificationToken = token;
  await user.save();

  const link = `${process.env.Frontend_Production_url}/reset-password?token=${token}`;
  const templatePath = path.join(
    __dirname,
    "..",
    "utils",
    "email",
    "templates",
    "forgotPassword.html"
  );
  let html = fs.readFileSync(templatePath, "utf8").replace(/{{link}}/g, link);
  console.error("something went wrong here!");
  await mailSender(email, "Generate a new password", html);
};

export const handleResetPassword = async (
  token: string,
  password: string,
  confirmPassword: string
) => {
  if (!token) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: AUTH_MESSAGES.MISSING_TOKEN,
    });
  }

  if (!password || !confirmPassword) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: COMMON_MESSAGES.REQUIRED_FIELDS,
    });
  }

  if (password !== confirmPassword) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: AUTH_MESSAGES.INVALID_PASSWORD,
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: string;
  };
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    });
  }

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.verificationToken = "";
  await user.save();
};

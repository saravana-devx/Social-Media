import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import mailSender from "../utils/email/mailSender";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../utils/constants";
import { Types } from "mongoose";
import { User } from "../models/user.model";
import { Otp } from "../models/otp.model";

interface RegisterUserInput {
  userName: string;
  email: string;
  password: string;
}

//token generation for verification of email/account
const generateVerificationToken = (userId: string) => {
  const secret = process.env.JWT_SECRET as jwt.Secret;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "24h",
  });
  return token;
};

export const registerNewUser = async ({
  userName,
  email,
  password,
}: RegisterUserInput) => {
  const isEmailAlreadyExists = await User.findOne({ email });
  if (isEmailAlreadyExists) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: RESPONSE_MESSAGES.USERS.EMAIL_ALREADY_IN_USE,
    });
  }

  const isUserNameAlreadyExists = await User.findOne({ userName: userName });

  if (isUserNameAlreadyExists) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: RESPONSE_MESSAGES.USERS.USERNAME_ALREADY_IN_USE,
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

  return user;
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
      message: RESPONSE_MESSAGES.USERS.NOT_FOUND,
    });
  }

  //If the email is verified, there's no need to proceed further to verify the account.
  if (user.verified) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: RESPONSE_MESSAGES.USERS.ALREADY_VERIFIED,
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
      message: RESPONSE_MESSAGES.USERS.REQUEST_NEW_OTP,
    });
  }

  // get otpNumber from otp stored in database
  const latestOtp = otp.otp;

  if (latestOtp !== otpNumber) {
    throw new ApiError({
      status: HTTP_STATUS.FORBIDDEN,
      message: RESPONSE_MESSAGES.USERS.WRONG_OTP,
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
};

export const handleResendOtp = async (userId: Types.ObjectId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.USERS.NOT_FOUND,
    });
  }

  // If already account verified no need to re-send otp
  if (user.verified) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: RESPONSE_MESSAGES.USERS.ALREADY_VERIFIED,
    });
  }

  //Generate a 6 digit OTP number
  const otpNumber = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

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
      message: RESPONSE_MESSAGES.USERS.NOT_FOUND,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: RESPONSE_MESSAGES.USERS.INVALID_PASSWORD,
    });
  }

  const secret = process.env.JWT_SECRET as string;
  const tokenPayload = {
    email: user.email,
    id: user._id,
    role: user.accountType,
  };
  const token = jwt.sign(tokenPayload, secret, { expiresIn: "24h" });

  user.password = "";
  return { token, user };
};

export const handleSendPasswordResetEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.USERS.NOT_FOUND,
    });
  }

  // const token = generateVerificationToken(user._id.toString());
  const token = generateVerificationToken(
    (user._id as Types.ObjectId).toString()
  );

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
      message: RESPONSE_MESSAGES.USERS.MISSING_TOKEN,
    });
  }

  if (!password || !confirmPassword) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
    });
  }

  if (password !== confirmPassword) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.USERS.INVALID_PASSWORD,
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: string;
  };
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.USERS.NOT_FOUND,
    });
  }

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.verificationToken = "";
  await user.save();
};

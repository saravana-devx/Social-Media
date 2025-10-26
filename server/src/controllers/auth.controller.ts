import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import { ApiResponse } from "../utils/apiResponseHandler/apiResponse";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../utils/constants";
import {
  registerNewUser,
  handleUserLogin,
  handleSendPasswordResetEmail,
  handleResetPassword,
  handleSendOtp,
  handleVerifyOtp,
  handleResendOtp,
} from "../services/auth.service";
import { Types } from "mongoose";

export const registerUser = [
  body("userName")
    .isLength({ min: 4 })
    .withMessage("UserName must be at least 4 characters long"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  asyncHandler(async (req: Request, res: Response) => {
    const { userName, email, password } = req.body;

    // Check if all required fields are present
    if (!userName || !email || !password) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: errors.array()[0].msg,
      });
    }

    const user = await registerNewUser({
      userName,
      email,
      password,
    });
    await handleSendOtp(user._id as Types.ObjectId, email, userName);

    res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse({
        status: HTTP_STATUS.CREATED,
        message: RESPONSE_MESSAGES.USERS.REGISTER,
        data: { user },
      })
    );
  }),
];

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
    });
  }

  await handleVerifyOtp(userId, otp);

  res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse({
      status: HTTP_STATUS.CREATED,
      message: RESPONSE_MESSAGES.USERS.OTP_VERIFIED,
    })
  );
});

export const resendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
    });
  }

  await handleResendOtp(userId as Types.ObjectId);

  res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse({
      status: HTTP_STATUS.OK,
      message: RESPONSE_MESSAGES.USERS.OTP_RESENT,
    })
  );
});

export const loginUser = [
  body("identifier").notEmpty().withMessage("Email or username is required"),
  body("password").notEmpty().withMessage("Password is required"),

  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: errors.array()[0].msg,
      });
    }

    // Identifier can be userName or email
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
      });
    }
    const { token, user } = await handleUserLogin(identifier, password);

    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse({
          status: HTTP_STATUS.OK,
          message: RESPONSE_MESSAGES.USERS.LOGIN,
          data: { token, user },
        })
      );
  }),
];

export const sendPasswordResetEmail = [
  body("email").isEmail().withMessage("Invalid email format"),

  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: errors.array()[0].msg,
      });
    }

    await handleSendPasswordResetEmail(req.body.email);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.USERS.EMAIL_SENT,
      })
    );
  }),
];

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password, confirmPassword } = req.body;
    const token = req.query.token as string;

    await handleResetPassword(token, password, confirmPassword);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.USERS.PASSWORD_UPDATED,
      })
    );
  }
);

import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import { ApiResponse } from "../utils/apiResponseHandler/apiResponse";
import {
  HTTP_STATUS,
  AUTH_MESSAGES,
  COMMON_MESSAGES,
  USER_MESSAGES,
} from "../utils/constants";
import {
  registerNewUser,
  handleUserLogin,
  handleSendPasswordResetEmail,
  handleResetPassword,
  handleSendOtp,
  handleVerifyOtp,
  handleResendOtp,
} from "../services/auth.service";
import {
  longLivedCookieOptions,
  shortLivedCookieOptions,
} from "../utils/helper/generateJwtToken";

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
        message: COMMON_MESSAGES.REQUIRED_FIELDS,
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: errors.array()[0].msg,
      });
    }

    const { user, token } = await registerNewUser({
      userName,
      email,
      password,
    });

    await handleSendOtp(user._id, email, userName);

    res
      .cookie("verification_token", token, shortLivedCookieOptions)
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse({
          status: HTTP_STATUS.CREATED,
          message: USER_MESSAGES.REGISTER,
          data: { user },
        })
      );
  }),
];

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { otp } = req.body;

  const { id } = req.currentUser;

  if (!otp) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: COMMON_MESSAGES.REQUIRED_FIELDS,
    });
  }

  const authToken = await handleVerifyOtp(id, otp);

  res
    .cookie("verification_token", "", {
      httpOnly: true,
      expires: new Date(0), // delete old token
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .cookie("auth_token", authToken, longLivedCookieOptions)
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse({
        status: HTTP_STATUS.CREATED,
        message: AUTH_MESSAGES.OTP_VERIFIED,
      })
    );
});

export const resendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.currentUser;

  await handleResendOtp(id);

  res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse({
      status: HTTP_STATUS.OK,
      message: AUTH_MESSAGES.OTP_RESENT,
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
        message: COMMON_MESSAGES.REQUIRED_FIELDS,
      });
    }
    const { token, user } = await handleUserLogin(identifier, password);

    res
      .cookie("auth_token", token, longLivedCookieOptions)
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse({
          status: HTTP_STATUS.OK,
          message: AUTH_MESSAGES.LOGIN,
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
        message: AUTH_MESSAGES.EMAIL_SENT,
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
        message: AUTH_MESSAGES.PASSWORD_UPDATED,
      })
    );
  }
);

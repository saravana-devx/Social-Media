import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import { AUTH_MESSAGES, HTTP_STATUS } from "../utils/constants";
import asyncHandler from "./asyncHandler.middleware";
import { JWTTokenPayload } from "../types/auth.types";

dotenv.config();

const secret = process.env.JWT_ACCESS_SECRET as string;
const verifyTokenFromCookie = (cookieName: string) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[cookieName];

    if (!token) {
      throw new ApiError({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: AUTH_MESSAGES.MISSING_TOKEN,
      });
    }

    const decode = jwt.verify(token, secret) as JWTTokenPayload;

    if (!decode) {
      throw new ApiError({
        status: HTTP_STATUS.CONFLICT,
        message: AUTH_MESSAGES.ERROR_DECODING_TOKEN,
      });
    }
    req.currentUser = decode;
    next();
  });

export const verifyAuth = verifyTokenFromCookie("verification_token");
export const authenticateUser = verifyTokenFromCookie("linkora_access_token");

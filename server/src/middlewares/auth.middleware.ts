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
    const token = req.cookies?.[cookieName];

    if (!token) {
      throw new ApiError( HTTP_STATUS.UNAUTHORIZED,AUTH_MESSAGES.MISSING_TOKEN);
    }

    try {
      const decoded = jwt.verify(token, secret) as JWTTokenPayload;

      if (!decoded?.id) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED,AUTH_MESSAGES.INVALID_TOKEN);
      }

      req.currentUser = decoded;
      return next();
    } catch (err) {
      throw new ApiError( HTTP_STATUS.UNAUTHORIZED,AUTH_MESSAGES.INVALID_OR_EXPIRED_TOKEN);
    }
  });

export const verifyAuth = verifyTokenFromCookie("verification_token"); // For verification stage
export const authenticateUser = verifyTokenFromCookie("linkora_access_token"); // For protected routes

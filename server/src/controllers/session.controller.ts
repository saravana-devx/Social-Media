// controllers/session.controller.ts
import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import { ApiResponse } from "../utils/apiResponseHandler/apiResponse";
import {
  getActiveSessions,
  revokeSessionById,
  logoutAllExceptCurrentService,
  getCurrentSessionInfo,
} from "../services/session.service";

export const getSessions = asyncHandler(async (req: Request, res: Response) => {
  const sessions = await getActiveSessions(req.currentUser.id);
  res.json(ApiResponse.success(sessions, "Active sessions retrieved."));
});

export const deleteSession = asyncHandler(
  async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    await revokeSessionById(req.currentUser.id, sessionId);
    res.json(ApiResponse.success(null, "Session revoked successfully."));
  }
);

export const logoutAllExceptCurrent = asyncHandler(
  async (req: Request, res: Response) => {
    const currentToken = req.cookies.linkora_refresh_token;
    const currentSession = await getCurrentSessionInfo(currentToken);

    await logoutAllExceptCurrentService(
      req.currentUser.id,
      currentSession?.sessionId || ""
    );
    res.json(ApiResponse.success(null, "Logged out from all other devices."));
  }
);

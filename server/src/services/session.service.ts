// services/session.service.ts
import { RefreshTokenModel } from "../models/refreshToken.model";
import { redisClient } from "../config/redis.config";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import { HTTP_STATUS, SESSION_MESSAGES } from "../utils/constants";

export const getActiveSessions = async (userId: string) => {
  const sessions = await RefreshTokenModel.find({
    userId,
    revoked: false,
  }).select(
    "sessionId deviceName ipAddress  osInfo userAgent location createdAt"
  );

  return sessions;
};

export const revokeSessionById = async (userId: string, sessionId: string) => {
  const session = await RefreshTokenModel.findOne({
    userId,
    sessionId,
    revoked: false,
  });
  if (!session) throw ApiError.NotFound(SESSION_MESSAGES.NOT_FOUND);

  session.revoked = true;
  await session.save();
  await redisClient.del(`session:${sessionId}`);
};

export const getCurrentSessionInfo = async (token: string) => {
  return await RefreshTokenModel.findOne({ token }).select(
    "sessionId deviceName userAgent ipAddress createdAt"
  );
};

export const logoutAllExceptCurrentService = async (
  userId: string,
  currentSessionId: string
) => {
  await RefreshTokenModel.updateMany(
    { userId, sessionId: { $ne: currentSessionId }, revoked: false },
    { revoked: true }
  );

  const keys = await redisClient.keys(`session:*`);
  for (const key of keys) {
    if (!key.includes(currentSessionId)) {
      await redisClient.del(key);
    }
  }
};

import { Schema, model, Types } from "mongoose";
import { IRefreshToken } from "../types/model.types";

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    token: { type: String, required: true, unique: true },
    sessionId: { type: String, required: true, index: true },

    deviceName: String,
    ipAddress: String,
    browserInfo: String,
    osInfo: String,
    userAgent: String,

    revoked: { type: Boolean, default: false, index: true },
    expiresAt: { type: Date, required: true, index: true },

    replacedByToken: { type: Schema.Types.ObjectId, ref: "RefreshToken" },
  },
  { timestamps: true }
);

export const RefreshTokenModel = model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

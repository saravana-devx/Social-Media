import { Schema, model, Types } from "mongoose";
import cron from "node-cron";

const RefreshTokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    replacedByToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

//auto-delete expired tokens
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

cron.schedule("0 0 * * *", async () => {
  await RefreshTokenModel.deleteMany({
    expiresAt: { $lt: new Date() },
  });
  console.log("🧹 Cleaned up expired refresh tokens");
});

export const RefreshTokenModel = model("RefreshToken", RefreshTokenSchema);
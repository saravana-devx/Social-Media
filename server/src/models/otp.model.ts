import { Document, model, Schema, Types } from "mongoose";

export interface IOtp extends Document {
  userId: Types.ObjectId;
  otp: number;
  createdAt: Date;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
  },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = model<IOtp>("OTP", otpSchema);

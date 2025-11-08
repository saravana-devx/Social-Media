import { Schema, model } from "mongoose";
import { IFriendRequest } from "../types/model.types";

const FriendRequestSchema = new Schema<IFriendRequest>({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const FriendRequest = model<IFriendRequest>(
  "FriendRequest",
  FriendRequestSchema
);

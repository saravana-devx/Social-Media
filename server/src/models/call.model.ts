import { Schema, model } from "mongoose";
import { ICall } from "../types/model.types";

const CallSchema = new Schema<ICall>({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  callerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  callType: {
    type: String,
    enum: ["audio", "video"],
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "missed", "ended"],
    default: "ongoing",
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: Date,
  duration: Number,
  callLogMessageId: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
});

export const Call = model<ICall>("Call", CallSchema);

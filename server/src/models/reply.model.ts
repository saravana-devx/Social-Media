import { Schema, model } from "mongoose";
import { IReply } from "../types/model.types";

const ReplySchema = new Schema<IReply>({
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: String,
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Reply = model<IReply>("Reply", ReplySchema);

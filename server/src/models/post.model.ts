import { Schema, model } from "mongoose";
import { IPost } from "../types/model.types";

const PostSchema = new Schema<IPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  media: [
    {
      type: Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
  description: String,
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  shares: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export const Post = model<IPost>("Post", PostSchema);

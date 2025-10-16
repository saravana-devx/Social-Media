import { Schema, model, Types, Document } from "mongoose";

export interface IPost extends Document {
  userId: Types.ObjectId;
  postSrc?: string;
  description?: string;
  likes: Types.ObjectId[];
  shares: number;
  createdAt: Date;
  comments: Types.ObjectId[];
}

const PostSchema = new Schema<IPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postSrc: String,
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

import { Schema, model, Types, Document } from "mongoose";

export interface IComment extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  description: string;
  likes: Types.ObjectId[];
  createdAt: Date;
  replies: Types.ObjectId[];
}

const CommentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
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
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
});

export const Comment = model<IComment>("Comment", CommentSchema);

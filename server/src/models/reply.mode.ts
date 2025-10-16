import { Schema, model, Types, Document } from "mongoose";

export interface IReply extends Document {
  commentId: Types.ObjectId;
  userId: Types.ObjectId;
  description: string;
  likes: Types.ObjectId[];
  createdAt: Date;
}

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
    efault: Date.now,
  },
});

export const Reply = model<IReply>("Reply", ReplySchema);

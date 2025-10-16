import { Schema, model, Types, Document } from "mongoose";

export interface IChat extends Document {
  type: "private" | "group";
  members: Types.ObjectId[];
  groupId?: Types.ObjectId;
  lastMessage?: Types.ObjectId;
  isMuted?: Types.ObjectId[];
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>({
  type: {
    type: String,
    enum: ["private", "group"],
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
  isMuted: [
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

export const Chat = model<IChat>("Chat", ChatSchema);

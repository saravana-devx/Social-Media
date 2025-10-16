import { Schema, model, Types, Document } from "mongoose";

export interface IMessage extends Document {
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  type: "text" | "image" | "video" | "file" | "system";
  seenBy: Types.ObjectId[];
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: String,
  type: {
    type: String,
    enum: ["text", "image", "video", "file", "system"],
    default: "text",
  },
  seenBy: [
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

const Message = model<IMessage>("Message", MessageSchema);
export default Message;

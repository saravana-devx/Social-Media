import { Schema, model, Types, Document } from "mongoose";

export interface INotification extends Document {
  userId: Types.ObjectId;
  type: "chat" | "call" | "friend_request" | "post" | "system";
  content: string;
  relatedId: Types.ObjectId;
  relatedModel: "chat" | "call" | "friend_request" | "post" | "system";
  isRead: boolean;
  createdAt: Date;
  expiresAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    enum: [
      "chat", // message or mention
      "call", // missed or ended call
      "friend_request",
      "post", // someone posted or liked a post
      "system", // app/system-level message
    ],
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  relatedId: {
    type: Schema.Types.ObjectId,
    refPath: "relatedModel", // dynamic reference based on type
  },

  relatedModel: {
    type: String,
    enum: ["Chat", "Call", "User", "Post"], // models that can be linked
  },

  isRead: {
    type: Boolean,
    default: false, // unread by default
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
  },
});

// TTL index (optional, configurable per type)
// Auto deleted after the mentioned expiresAt field
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Notification = model<INotification>(
  "Notification",
  NotificationSchema
);

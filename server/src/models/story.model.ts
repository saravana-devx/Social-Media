import { model, Schema } from "mongoose";
import { IStory } from "../types/model.types";

const StorySchema = new Schema<IStory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mediaUrl: String,
  views: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  }, // 24h TTL
});

export const Story = model<IStory>("Story", StorySchema);

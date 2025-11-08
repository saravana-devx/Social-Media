import { Schema, model } from "mongoose";
import { IInteraction } from "../types/model.types";

const InteractionSchema = new Schema<IInteraction>({
  actorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  targetId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  targetType: {
    type: String,
    enum: ["post", "comment", "story", "user"],
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "view", "comment", "share", "follow"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Interaction = model<IInteraction>(
  "Interaction",
  InteractionSchema
);

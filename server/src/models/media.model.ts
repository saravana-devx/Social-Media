import mongoose, { model } from "mongoose";
import { IMedia } from "../types/model.types";

const mediaSchema = new mongoose.Schema<IMedia>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    resource_type: { type: String, required: true }, // image/video/raw
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    duration: { type: Number },
  },
  { timestamps: true }
);

export const Media = model<IMedia>("Media", mediaSchema);

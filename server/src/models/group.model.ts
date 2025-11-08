import { Schema, model } from "mongoose";
import { IGroup } from "../types/model.types";

const GroupSchema = new Schema<IGroup>({
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  groupName: String,
});

export const Group = model<IGroup>("Group", GroupSchema);

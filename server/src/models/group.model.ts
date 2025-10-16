import { Schema, model, Types, Document } from "mongoose";

export interface IGroup extends Document {
  admins: Types.ObjectId[];
  members: Types.ObjectId[];
  groupName: string;
}

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

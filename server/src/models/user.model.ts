import { Schema,  model } from "mongoose";
import { IUser } from "../types/model.types";

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    // To delete the user profile from table
    verificationExpires: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    },
    profileImage: String,
    about: String,
    location: String,
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

//Delete this document after the account is not verified after 24hours using verificationExpires
userSchema.index(
  { verificationExpires: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { verified: false } }
);

// cron.schedule("0 0 * * *", async () => {
//   // runs daily
//   await User.deleteMany({
//     verified: false,
//     createdAt: { $lt: new Date(Date.now() - 1000) }, // older than 7 days
//   });
//   console.log("Cleaned up unverified users");
// });

export const User = model<IUser>("User", userSchema);

import { Schema, Document, model, Types } from "mongoose";
import cron from "node-cron";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  verified: boolean;
  accountType: "Admin" | "User";
  verificationToken?: string;
  verificationExpires: Date;
  profileImage: string;
  about?: string;
  location?: string;
  joiningDate: Date;
  friends: Types.ObjectId[];
  savedPosts: Types.ObjectId[];
}

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
      default : "User"
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationExpires: {
      type: Date,
      default: () => new Date(Date.now() +  24 * 60 * 60 * 1000), // 24 hours
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

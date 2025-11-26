import { Types } from "mongoose";

export interface IUserRef {
  _id: string | Types.ObjectId;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

export interface IReply {
  _id: string;
  userId: Types.ObjectId | IUserRef; // 👈 Now supports populated user
  commentId: Types.ObjectId;
  description: string;
  likes: Types.ObjectId[];
  createdAt: Date;
}
export interface IComment {
  _id: string;
  userId:  IUserRef; // 👈 Now supports populated user
  postId: Types.ObjectId;
  description: string;
  likes: Types.ObjectId[];
  createdAt: Date;
  replies: IReply[];
}

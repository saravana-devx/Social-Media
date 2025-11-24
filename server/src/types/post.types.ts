import { Types } from "mongoose";

export type createPost = {
  userId: string;
  mediaIds: Types.ObjectId[];
  // mediaId: Types.ObjectId;
  description: string;
};

export type GetPostsByUserResult = {
  posts: any[];
  nextCursor: string | null;
};

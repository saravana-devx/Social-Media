import { Types } from "mongoose";

export type createPost = {
  userId: string;
  mediaId: string;
  // mediaId: Types.ObjectId;
  description: string;
};

export type GetPostsByUserResult = {
  posts: any[];
  nextCursor: string | null;
};

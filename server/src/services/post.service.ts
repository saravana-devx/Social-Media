import { ApiError } from "../utils/apiResponseHandler/apiError";
import { HTTP_STATUS, MEDIA_MESSAGES } from "../utils/constants";
import {
  validateMediaExists,
  validateUserExists,
} from "../utils/helper/dbValidators";
import { createPost } from "../types/post.types";
import { Post } from "../models/post.model";
import { Media } from "../models/media.model";
import { User } from "../models/user.model";
import mongoose from "mongoose";

export const handleCreatePost = async (data: createPost) => {
  await validateUserExists(data.userId);
  await validateMediaExists(data.mediaId);

  const post = await Post.create({
    userId: data.userId,
    media: data.mediaId,
    description: data.description,
  });
  console.log("post :: ", post);
  const user = await User.findByIdAndUpdate(data.userId, {
    $addToSet: { post: post._id },
  });
};

type GetPostsByUserResult = {
  posts: any[]; // replace `any` with your IPost DTO type if available
  nextCursor: string | null;
};

export const handleGetPostsByUser = async (
  userId: string,
  cursor?: string,
  limit: number = 10
): Promise<GetPostsByUserResult> => {
  // validate user exists (throws if not)
  await validateUserExists(userId);

  // build base query - explicitly use ObjectId for userId
  const query: any = { userId: new mongoose.Types.ObjectId(userId) };

  // if cursor provided, convert to ObjectId and compare
  if (cursor) {
    if (!mongoose.Types.ObjectId.isValid(cursor)) {
      throw new Error("Invalid cursor");
    }
    query._id = { $lt: new mongoose.Types.ObjectId(cursor) };
  }

  // fetch limit + 1 to determine if there is a next page
  const fetchLimit = Math.max(1, limit); // ensure positive
  const docs = await Post.find(query)
    .sort({ _id: -1 })
    .limit(fetchLimit + 1) // fetch one extra to detect nextCursor
    .populate("media")
    .populate("userId", "userName profileImage")
    .lean()
    .exec();

  // Determine if there is a next cursor
  let nextCursor: string | null = null;
  let posts = docs;

  if (docs.length > fetchLimit) {
    // there is at least one more page
    const extra = docs.pop(); // remove the extra doc
    posts = docs;
    nextCursor = (extra?._id as mongoose.Types.ObjectId).toString();
  } else {
    nextCursor = null;
  }

  // Return posts (trimmed to limit) and nextCursor as string or null
  return { posts, nextCursor };
};

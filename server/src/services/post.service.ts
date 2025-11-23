import mongoose from "mongoose";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import { HTTP_STATUS } from "../utils/constants";
import {
  validateMediaExists,
  validateUserExists,
} from "../utils/helper/dbValidators";
import { createPost, GetPostsByUserResult } from "../types/post.types";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

export const handleCreatePost = async (data: createPost) => {
  await validateUserExists(data.userId);
  await validateMediaExists(data.mediaId);

  const post = await Post.create({
    userId: data.userId,
    media: data.mediaId,
    description: data.description,
  });

  await User.findByIdAndUpdate(data.userId, {
    $addToSet: { post: post._id },
  });

  return post;
};

export const handleGetPostsByUser = async (
  userId: string,
  cursor?: string,
  limit: number = 10
): Promise<GetPostsByUserResult> => {
  await validateUserExists(userId);

  const query: any = { userId: new mongoose.Types.ObjectId(userId) };

  if (cursor) {
    if (!mongoose.Types.ObjectId.isValid(cursor)) {
      throw ApiError.BadRequest("Invalid cursor value");
    }
    query._id = { $lt: new mongoose.Types.ObjectId(cursor) };
  }

  const validLimit = Math.max(1, limit);

  const fetchedPosts = await Post.find(query)
    .sort({ _id: -1 })
    .limit(validLimit + 1)
    .populate("media")
    .populate("userId", "userName profileImage")
    .lean()
    .exec();

  let nextCursor: string | null = null;
  let posts = fetchedPosts;

  if (fetchedPosts.length > validLimit) {
    const extra = fetchedPosts.pop();
    posts = fetchedPosts;
    nextCursor = (extra?._id as mongoose.Types.ObjectId).toString();
  }

  return { posts, nextCursor };
};

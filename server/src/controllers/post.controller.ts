import type { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import {
  handleCreatePost,
  handleGetPostsByUser,
} from "../services/post.service";
import { ApiResponse } from "../utils/apiResponseHandler/apiResponse";
import { COMMON_MESSAGES, HTTP_STATUS, POST_MESSAGES } from "../utils/constants";
import { ApiError } from "../utils/apiResponseHandler/apiError";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.currentUser.id;
  const { mediaId } = req.params;
  const { description } = req.body;

  if (!mediaId || !description) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: COMMON_MESSAGES.REQUIRED_FIELDS,
    });
  }

  await handleCreatePost({
    userId,
    mediaId,
    description,
  });

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse({
      status: HTTP_STATUS.CREATED,
      message: POST_MESSAGES.CREATED,
    })
  );
});

export const updatePost = asyncHandler(
  async (req: Request, res: Response) => {}
);

// use deleted_by and deleted_at to make a archieve (list of posts)
export const deletePost = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const addLike = asyncHandler(async (req: Request, res: Response) => {});

export const getUserPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const cursor = req.query.cursor as string;
    const limit = Number(req.query.limit) || 10;

    const result = await handleGetPostsByUser(userId, cursor, limit);

    return res.status(200).json(
      new ApiResponse({
        status: 200,
        message: POST_MESSAGES.FETCHED,
        data: result,
      })
    );
  }
);

export const getSavedPost = asyncHandler(
  async (req: Request, res: Response) => {}
);

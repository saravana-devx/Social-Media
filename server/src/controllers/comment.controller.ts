import asyncHandler from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";

import { COMMON_MESSAGES, HTTP_STATUS } from "../utils/constants";
import { ApiResponse } from "../utils/apiResponseHandler/apiResponse";

import {
  handleCommentsAndReply,
  handleCreateComment,
  handleCreateCommentReply,
  handleToggleCommentLike,
  handleToggleReplyLike,
} from "../services/comment.service";
import { ApiError } from "../utils/apiResponseHandler/apiError";

export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: userId } = req.currentUser;
    const { postId } = req.params;
    const { commentText } = req.body;
    
    if (!postId || !commentText)
      throw ApiError.BadRequest(COMMON_MESSAGES.REQUIRED_FIELDS);

    const { updatedPost, comment } = await handleCreateComment(
      commentText,
      postId,
      userId
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(ApiResponse.created({ updatedPost, comment }, "Created comment"));
  }
);

export const createCommentReply = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: userId } = req.currentUser;
    const { commentId } = req.params;
    const { replyText } = req.body;
    if (!commentId || !replyText)
      throw ApiError.BadRequest(COMMON_MESSAGES.REQUIRED_FIELDS);

    const { comment, reply } = await handleCreateCommentReply(
      replyText,
      commentId,
      userId
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(ApiResponse.created({ comment, reply }, "Created sub comment"));
  }
);

export const toggleCommentLike = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.currentUser;
    const { commentId } = req.params;
    if (!commentId) throw ApiError.BadRequest(COMMON_MESSAGES.REQUIRED_FIELDS);

    await handleToggleCommentLike(id, commentId);

    return res
      .status(HTTP_STATUS.OK)
      .json(ApiResponse.success("comment like toggled"));
  }
);

export const toggleReplyLike = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.currentUser;
    const { replyId } = req.params;
    if (!replyId) throw ApiError.BadRequest(COMMON_MESSAGES.REQUIRED_FIELDS);

    await handleToggleReplyLike(id, replyId);

    return res
      .status(HTTP_STATUS.OK)
      .json(ApiResponse.success(`Reply like toggled.`));
  }
);

export const getCommentsAndReply = asyncHandler(
  async (req: Request, res: Response) => {
    const { postId } = req.params;
    if (!postId) throw ApiError.BadRequest(COMMON_MESSAGES.REQUIRED_FIELDS);

    const comments = await handleCommentsAndReply(postId);

    return res
      .status(HTTP_STATUS.OK)
      .json(ApiResponse.success(comments, "comment of posts"));
  }
);

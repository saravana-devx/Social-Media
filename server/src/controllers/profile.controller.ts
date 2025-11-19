import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";

import {
  handleUpdateProfile,
  handleGetFriends,
  handleSendFriendRequest,
  handleAcceptFriendRequest,
  handleDeleteProfile,
  handleRemoveFriend,
  handleUpdateProfileImage,
  handleGetUserDetail,
  handleCancelFriendRequest,
  handleRejectFriendRequest,
} from "../services/profile.service";

import { ApiResponse } from "../utils/apiResponseHandler/apiResponse";
import {
  FRIEND_MESSAGES,
  HTTP_STATUS,
  USER_MESSAGES,
} from "../utils/constants";

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.currentUser.id;

    const { firstName, lastName, phoneNumber, dob, location, about } = req.body;

    const user = await handleUpdateProfile({
      id,
      firstName,
      lastName,
      phoneNumber,
      dob,
      location,
      about,
    });

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: USER_MESSAGES.UPDATED,
        data: user,
      })
    );
  }
);

export const getFriends = asyncHandler(async (req: Request, res: Response) => {
  const id = req.currentUser.id;

  const friends = await handleGetFriends(id);

  res.status(HTTP_STATUS.OK).json(
    new ApiResponse({
      status: HTTP_STATUS.OK,
      message: USER_MESSAGES.FOUND,
      data: friends,
    })
  );
});

export const sendFriendRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.currentUser.id;
    const { friendId } = req.params;

    const message = await handleSendFriendRequest(id, friendId);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message,
      })
    );
  }
);

export const acceptFriendRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.currentUser.id;
    const { requesterId } = req.params;

    const message = await handleAcceptFriendRequest(id, requesterId);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message,
      })
    );
  }
);

export const cancelFriendRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.currentUser.id;
    const { targetUserId } = req.params;

    const message = await handleCancelFriendRequest(userId, targetUserId);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message,
      })
    );
  }
);

export const rejectFriendRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.currentUser.id;
    const { requesterId } = req.params;

    const message = await handleRejectFriendRequest(userId, requesterId);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message,
      })
    );
  }
);

export const removeFriend = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.currentUser.id;
    const { friendId } = req.params;

    const message = await handleRemoveFriend(id, friendId);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message,
      })
    );
  }
);

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.currentUser.id;

  await handleDeleteProfile(id);

  res.status(HTTP_STATUS.OK).json(
    new ApiResponse({
      status: HTTP_STATUS.OK,
      message: USER_MESSAGES.DELETED,
    })
  );
});

export const updateProfileImage = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.currentUser.id;
    const { secureUrl } = req.body;
    
    const updated = await handleUpdateProfileImage(id, secureUrl);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: USER_MESSAGES.UPDATED,
        data: updated,
      })
    );
  }
);

export const getUserDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await handleGetUserDetail(userId);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: USER_MESSAGES.FOUND,
        data: user,
      })
    );
  }
);

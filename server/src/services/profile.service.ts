import mongoose from "mongoose";
import { FriendRequest } from "../models/friendRequest.model";
import { User } from "../models/user.model";
import { UpdateProfile } from "../types/profile.types";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import {
  COMMON_MESSAGES,
  FRIEND_MESSAGES,
  HTTP_STATUS,
  USER_MESSAGES,
} from "../utils/constants";
import { validateUserExists } from "../utils/helper/dbValidators";

export const handleUpdateProfile = async (data: UpdateProfile) => {
  await validateUserExists(data.id);

  // check email uniqueness (exclude current user)
  // if (data.email) {
  //   const isEmailAlreadyExists = await User.findOne({
  //     email: data.email,
  //     _id: { $ne: data.id },
  //   });

  //   if (isEmailAlreadyExists) {
  //     throw new ApiError({
  //       status: HTTP_STATUS.CONFLICT,
  //       message: USER_MESSAGES.EMAIL_ALREADY_IN_USE,
  //     });
  //   }
  // }

  // Check username uniqueness (exclude current user)
  // if (data.userName) {
  //   const isUserNameAlreadyExists = await User.findOne({
  //     userName: data.userName,
  //     _id: { $ne: data.id },
  //   });

  //   if (isUserNameAlreadyExists) {
  //     throw new ApiError({
  //       status: HTTP_STATUS.CONFLICT,
  //       message: USER_MESSAGES.USERNAME_ALREADY_IN_USE,
  //     });
  //   }
  // }

  const updatePayload: any = {};

  if (data.firstName) updatePayload.firstName = data.firstName;
  if (data.lastName) updatePayload.lastName = data.lastName;
  if (data.phoneNumber) updatePayload.phoneNumber = data.phoneNumber;
  if (data.dob) updatePayload.dob = data.dob;
  if (data.location) updatePayload.location = data.location;
  if (data.about) updatePayload.about = data.about;

  if (Object.keys(updatePayload).length === 0) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: USER_MESSAGES.NO_DATA_PROVIDED,
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    data.id,
    { $set: updatePayload },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: COMMON_MESSAGES.UPDATE_FIELD_REQUIRED,
    });
  }

  return updatedUser;
};

export const handleDeleteProfile = async (userId: string) => {
  await validateUserExists(userId);

  const deleted = await User.findByIdAndDelete(userId);

  if (!deleted) {
    throw new ApiError({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: COMMON_MESSAGES.UPDATE_FIELD_REQUIRED,
    });
  }

  return deleted;
};

export const handleGetFriends = async (userId: string) => {
  await validateUserExists(userId);

  const userWithFriends = await User.findById(userId).populate({
    path: "friends",
    select: "-password -verificationToken -verificationExpires",
  });

  if (!userWithFriends) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    });
  }

  return userWithFriends.friends;
};

export const handleSendFriendRequest = async (from: string, to: string) => {
  if (from === to) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: FRIEND_MESSAGES.CANNOT_SELF_REQUEST,
    });
  }

  await validateUserExists(from);
  await validateUserExists(to);

  const alreadyFriends = await User.exists({ _id: from, friends: to });
  if (alreadyFriends) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: FRIEND_MESSAGES.ALREADY_FRIENDS,
    });
  }

  const alreadySent = await FriendRequest.exists({ from, to });
  if (alreadySent) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      message: FRIEND_MESSAGES.ALREADY_SENT,
    });
  }

  await FriendRequest.create({ from, to });

  return FRIEND_MESSAGES.REQUEST_SENT;
};

export const handleAcceptFriendRequest = async (
  userId: string,
  requesterId: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (userId === requesterId) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: FRIEND_MESSAGES.CANNOT_SELF_ACCEPT,
      });
    }

    await validateUserExists(userId);
    await validateUserExists(requesterId);

    const request = await FriendRequest.findOne({
      from: requesterId,
      to: userId,
      status: "pending",
    }).session(session);

    if (!request) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: FRIEND_MESSAGES.NOT_FOUND,
      });
    }

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: requesterId } },
      { session }
    );

    await User.findByIdAndUpdate(
      requesterId,
      { $addToSet: { friends: userId } },
      { session }
    );

    await FriendRequest.findByIdAndUpdate(
      request._id,
      { status: "accepted" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return FRIEND_MESSAGES.REQUEST_ACCEPTED;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const handleCancelFriendRequest = async (
  userId: string,
  targetUserId: string
) => {
  const deleted = await FriendRequest.findOneAndDelete({
    from: userId,
    to: targetUserId,
    status: "pending",
  });

  if (!deleted) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: FRIEND_MESSAGES.NOT_FOUND,
    });
  }

  return FRIEND_MESSAGES.REQUEST_CANCELED;
};

export const handleRejectFriendRequest = async (
  userId: string,
  requesterId: string
) => {
  const request = await FriendRequest.findOneAndUpdate(
    {
      from: requesterId,
      to: userId,
      status: "pending",
    },
    { status: "rejected" }
  );

  if (!request) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: FRIEND_MESSAGES.NOT_FOUND,
    });
  }

  return FRIEND_MESSAGES.REQUEST_REJECTED;
};

export const handleRemoveFriend = async (userId: string, friendId: string) => {
  if (userId === friendId) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: FRIEND_MESSAGES.CANNOT_SELF_REQUEST,
    });
  }

  await validateUserExists(userId);
  await validateUserExists(friendId);

  const areFriends = await User.exists({
    _id: userId,
    friends: friendId,
  });

  if (!areFriends) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: FRIEND_MESSAGES.NOT_FRIENDS,
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { session }
    );

    await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return FRIEND_MESSAGES.FRIEND_REMOVED;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const handleUpdateProfileImage = async (userId: string, secureUrl: string) => {
  await validateUserExists(userId);

  if(!secureUrl){
    throw new ApiError({
      status : HTTP_STATUS.NOT_FOUND,
      message : "URL is not provided to update profile image"
    })
  }
  const updated = await User.findByIdAndUpdate(
    userId,
    { profileImage: secureUrl },
    { new: true }
  ).select("-password");

  if (!updated) {
    throw new ApiError({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: USER_MESSAGES.PROFILE_IMAGE_UPDATE_FAILED,
    });
  }

  return updated;
};

export const handleGetUserDetail = async (userId: string) => {
  const user = await validateUserExists(userId);
  return user;
};

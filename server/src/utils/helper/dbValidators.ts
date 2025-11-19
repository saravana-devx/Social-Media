import { Media } from "../../models/media.model";
import { User } from "../../models/user.model";
import { ApiError } from "../apiResponseHandler/apiError";
import { HTTP_STATUS, MEDIA_MESSAGES, USER_MESSAGES } from "../constants";

const validateUserExists = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_MESSAGES.NOT_FOUND,
    });
  }
  return user;
};

const validateMediaExists = async (mediaId: string) => {
  const media = await Media.findById(mediaId);
  if (!media) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: MEDIA_MESSAGES.NOT_FOUND,
    });
  }
  return media;
};

export { validateUserExists, validateMediaExists };

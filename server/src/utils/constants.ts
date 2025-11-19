const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};

const COMMON_MESSAGES = {
  REQUIRED_FIELDS: "All fields are required.",
  UPDATE_FIELD_REQUIRED: "Please provide at least one field to update.",
  IMAGE_NOT_FOUND: "Image not found.",
  VIDEO_NOT_FOUND: "Video not found.",
  INTERNAL_SERVER_ERROR: "Something went wrong in the server",
};

const AUTH_MESSAGES = {
  LOGIN: "User logged in successfully.",
  INVALID_PASSWORD: "Incorrect Password.",
  MISSING_TOKEN: "Token is missing.",
  INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token.",
  ERROR_DECODING_TOKEN: "Error decoding JWT token.",
  EMAIL_SENT: "Verification email sent successfully.",
  EMAIL_VERIFIED: "Email verified successfully.",
  ALREADY_EMAIL_VERIFIED: "User account is already verified through OTP.",
  UNVERIFIED_EMAIL: "Email is not verified.",
  VERIFICATION_TOKEN_EXPIRED: "Verification token has expired.",
  OTP_SENT: "OTP sent successfully.",
  OTP_RESENT: "OTP re-sent successfully.",
  OTP_VERIFIED: "OTP verified successfully.",
  WRONG_OTP: "Incorrect OTP.",
  REQUEST_NEW_OTP: "OTP has expired, request a new one.",
  PASSWORD_UPDATED: "Password updated successfully.",
  SAME_PASSWORD: "New password cannot be the same as the current password.",
  UNAUTHORIZED: "Unauthorized access.",
  logout: "User Logged Out.",
};

const USER_MESSAGES = {
  REGISTER: "User registered successfully.",
  UPDATED: "User details updated successfully.",
  DELETED: "User account deleted successfully.",
  FOUND: "User found.",
  NOT_FOUND: "User not found.",
  EMAIL_ALREADY_IN_USE: "Email is already in use.",
  USERNAME_ALREADY_IN_USE: "Username is already in use.",
  NO_DATA_PROVIDED: "No data provided for updating profile.",
  PROFILE_IMAGE_UPDATE_FAILED: "Failed to update profile image.",
};

const FRIEND_MESSAGES = {
  REQUEST_SENT: "Friend request sent successfully.",
  REQUEST_ACCEPTED: "Friend request accepted successfully.",
  REQUEST_REJECTED: "Friend request rejected successfully.",
  REQUEST_CANCELED: "Friend request canceled successfully.",
  NOT_FOUND: "Friend request not found.",
  ALREADY_SENT: "Friend request already sent.",
  ALREADY_FRIENDS: "You are already friends.",
  NOT_FRIENDS: "You are not friends.",
  CANNOT_SELF_REQUEST: "You cannot send a request to yourself.",
  CANNOT_SELF_ACCEPT: "You cannot accept your own request.",
  FRIEND_REMOVED: "Friend removed successfully.",
};

const POST_MESSAGES = {
  CREATED: "Post created successfully.",
  FETCHED: "user posts.",
};

const MEDIA_MESSAGES = {
  SAVED: "Media uploaded and stored successfully.",
  UPLOADSIGNATURE: "Upload signature generated successfully",
  NOT_FOUND: "Image/video not found",
};

export {
  HTTP_STATUS,
  COMMON_MESSAGES,
  AUTH_MESSAGES,
  USER_MESSAGES,
  FRIEND_MESSAGES,
  POST_MESSAGES,
  MEDIA_MESSAGES,
};

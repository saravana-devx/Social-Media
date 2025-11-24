/**
 * HTTP Status Codes
 */
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
  INTERNAL_SERVER_ERROR: "Something went wrong on the server.",
  ACTION_SUCCESSFUL: "Action completed successfully.",
  INVALID_INPUT: "Invalid input provided.",
};

const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  INVALID_PASSWORD: "Incorrect password.",
  UNAUTHORIZED: "Unauthorized access.",

  MISSING_TOKEN: "Token is missing.",
  INVALID_TOKEN: "Token is invalid.",
  INVALID_REFRESH_TOKEN: "Invalid refresh token.",
  TOKEN_REFRESHED: "Token refreshed successfully.",
  ERROR_DECODING_TOKEN: "Error decoding token.",
  INVALID_OR_EXPIRED_REFRESH_TOKEN: "Refresh token is invalid or expired.",
  INVALID_OR_EXPIRED_TOKEN: "Token is invalid or expired.",

  EMAIL_REQUIRED: "Email is required.",
  EMAIL_SENT: "Verification email sent successfully.",
  EMAIL_VERIFIED: "Email verified successfully.",
  EMAIL_ALREADY_VERIFIED: "User email is already verified.",
  UNVERIFIED_EMAIL: "Email is not verified.",
  VERIFICATION_TOKEN_EXPIRED: "Verification token has expired.",

  OTP_SENT: "OTP sent successfully.",
  OTP_RESENT: "OTP re-sent successfully.",
  OTP_VERIFIED: "OTP verified successfully.",
  WRONG_OTP: "Incorrect OTP.",
  OTP_EXPIRED: "OTP expired, please request a new one.",

  PASSWORD_UPDATED: "Password updated successfully.",
  SAME_PASSWORD: "New password cannot be the same as the old password.",

  MISSING_META_DATA: "Missing device meta data",
  ALREADY_LOGGED_IN_ANOTHER_DEVICE: "Already logged in on another device.",
};

const SESSION_MESSAGES = {
  NOT_FOUND: "Session not found",
};

const USER_MESSAGES = {
  REGISTER_SUCCESS: "User registered successfully.",
  UPDATE_SUCCESS: "User updated successfully.",
  UPDATE_FAILED: "User updation failed.",
  DELETE_SUCCESS: "User deleted successfully.",
  DELETE_FAILED: "User deletion failed",
  FOUND: "User found.",
  NOT_FOUND: "User not found.",
  EMAIL_EXISTS: "Email is already in use.",
  USERNAME_EXISTS: "Username is already in use.",
  NO_DATA_PROVIDED: "No data provided.",
  PROFILE_IMAGE_UPDATE_FAILED: "Failed to update profile image.",
};

const FRIEND_MESSAGES = {
  REQUEST_SENT: "Friend request sent.",
  REQUEST_ACCEPTED: "Friend request accepted.",
  REQUEST_REJECTED: "Friend request rejected.",
  REQUEST_CANCELED: "Friend request canceled.",
  NOT_FOUND: "Friend request not found.",
  ALREADY_SENT: "Friend request already sent.",
  ALREADY_FRIENDS: "Already friends.",
  NOT_FRIENDS: "Not friends.",
  CANNOT_SELF_REQUEST: "Cannot send request to yourself.",
  CANNOT_SELF_ACCEPT: "Cannot accept your own request.",
  FRIEND_REMOVED: "Friend removed successfully.",
};

const POST_MESSAGES = {
  CREATED: "Post created successfully.",
  FETCH_SUCCESS: "Posts fetched successfully.",
};

const MEDIA_MESSAGES = {
  UPLOAD_SUCCESS: "Media uploaded successfully.",
  SAVED: "Media saved successfully.",
  SIGNATURE_GENERATED: "Upload signature generated successfully.",
  NOT_FOUND: "Media not found.",
};

export {
  HTTP_STATUS,
  COMMON_MESSAGES,
  AUTH_MESSAGES,
  SESSION_MESSAGES,
  USER_MESSAGES,
  FRIEND_MESSAGES,
  POST_MESSAGES,
  MEDIA_MESSAGES,
};

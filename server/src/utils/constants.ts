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
  IMAGE_NOT_FOUND: "Image not found.",
  VIDEO_NOT_FOUND: "Video not found.",
  INTERNAL_SERVER_ERROR: "Something went wrong in the server",
};

const AUTH_MESSAGES = {
  LOGIN: "User logged in successfully.",
  INVALID_PASSWORD : "Incorrect Password.",
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
};

// const RESPONSE_MESSAGES = {
//   COMMON: {
//     REQUIRED_FIELDS: "All fields are required.",
//     IMAGE_NOT_FOUND: "Image not found.",
//     VIDEO_NOT_FOUND: "Video not found.",
//     INTERNAL_SERVER_ERROR: "Something went wrong in the server",
//   },
//   USERS: {
//     REGISTER: "User register successfully.",
//     LOGIN: "User login in successfully.",
//     NOT_FOUND: "User not found.",
//     FOUND: "User found.",
//     NO_DATA_PROVIDED: "No data provided for updating profile.",
//     EMAIL_NOT_FOUND: "Email not found",
//     EMAIL_ALREADY_IN_USE: "Email is already in use.",
//     USERNAME_ALREADY_IN_USE: "User name is already in use",
//     INVALID_PASSWORD: "Invalid password",
//     MISSING_TOKEN: "Token is missing.",
//     EMAIL_SENT: "Email sent successfully",
//     EMAIL_VERIFIED: "Email verified successfully",
//     UNVERIFIED_EMAIL: "Email in not verified",
//     VERIFICATION_TOKEN_EXPIRED: "Invalid or expired token",
//     UNAUTHORIZED: "Unauthorized access.",
//     SAME_PASSWORD:
//       "Your new password cannot be the same as the current password",
//     PASSWORD_UPDATED: "User password updated successfully",
//     UPDATED: "User details updated successfully.",
//     DELETED: "User account deleted successfully.",
//     OTP_SENT: "OTP sent successfully.",
//     OTP_RESENT: "OTP re-sent successfully",
//     OTP_VERIFIED: "OTP verified successfully",
//     WRONG_OTP: "OTP is incorrect",
//     ALREADY_VERIFIED: "User account is already verified through OTP.",
//     REQUEST_NEW_OTP: "Otp as expired request a new one",
//     INVALID_OR_EXPIRED_TOKEN: "Invalid or the token has been expired.",
//     ERROR_DECODING_TOKEN: "Error while decoding jwt token.",
//   },
// };

export { HTTP_STATUS, COMMON_MESSAGES, AUTH_MESSAGES, USER_MESSAGES };

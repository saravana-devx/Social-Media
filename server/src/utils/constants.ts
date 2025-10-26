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

const RESPONSE_MESSAGES = {
  COMMON: {
    REQUIRED_FIELDS: "All fields are required.",
    IMAGE_NOT_FOUND: "Image not found.",
    VIDEO_NOT_FOUND: "Video not found.",
    INTERNAL_SERVER_ERROR: "Something went wrong in the server",
  },
  USERS: {
    REGISTER: "User register successfully.",
    LOGIN: "User login in successfully.",
    NOT_FOUND: "User not found.",
    FOUND: "User found.",
    NO_DATA_PROVIDED: "No data provided for updating profile.",
    EMAIL_NOT_FOUND: "Email not found",
    EMAIL_ALREADY_IN_USE: "Email is already in use.",
    USERNAME_ALREADY_IN_USE: "User name is already in use",
    INVALID_PASSWORD: "Invalid password",
    MISSING_TOKEN: "Token is missing.",
    EMAIL_SENT: "Email sent successfully",
    EMAIL_VERIFIED: "Email verified successfully",
    UNVERIFIED_EMAIL: "Email in not verified",
    VERIFICATION_TOKEN_EXPIRED: "Invalid or expired token",
    UNAUTHORIZED: "Unauthorized access.",
    SAME_PASSWORD:
      "Your new password cannot be the same as the current password",
    PASSWORD_UPDATED: "User password updated successfully",
    UPDATED: "User details updated successfully.",
    DELETED: "User account deleted successfully.",
    // USER_STATUS: "User account Status Updated.",
    OTP_SENT: "OTP sent successfully.",
    OTP_RESENT: "OTP re-sent successfully",
    OTP_VERIFIED: "OTP verified successfully",
    WRONG_OTP: "OTP is incorrect",
    ALREADY_VERIFIED: "User account is already verified through OTP.",
    REQUEST_NEW_OTP: "Otp as expired request a new one",
  },
};

export { HTTP_STATUS, RESPONSE_MESSAGES };

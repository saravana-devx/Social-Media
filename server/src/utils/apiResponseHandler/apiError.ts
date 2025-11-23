class ApiError extends Error {
  status: number;
  message: string;
  success: boolean;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.success = false;
  }

  static BadRequest(msg: string) {
    return new ApiError(400, msg);
  }
  static Unauthorized(msg: string) {
    return new ApiError(401, msg);
  }
  static Forbidden(msg: string) {
    return new ApiError(403, msg);
  }
  static NotFound(msg: string) {
    return new ApiError(404, msg);
  }
  static Conflict(msg: string) {
    return new ApiError(409, msg);
  }
  static ServerError(msg = "Something went wrong") {
    return new ApiError(500, msg);
  }
}

export { ApiError };
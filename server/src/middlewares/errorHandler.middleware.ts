import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiResponseHandler/apiError";
import { COMMON_MESSAGES, HTTP_STATUS,  } from "../utils/constants";

const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = {
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
    errors: err.errors && err.errors.length > 0 ? err.errors : undefined,
  };

  res.status(response.status).json(response);
  // next();
};

export default errorMiddleware;

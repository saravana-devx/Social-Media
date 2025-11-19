import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import { ApiResponse } from "../utils/apiResponseHandler/apiResponse";
import { HTTP_STATUS, MEDIA_MESSAGES } from "../utils/constants";
import cloudinary from "../config/cloudinary.config";
import { Media } from "../models/media.model";

export const getUploadSignature = asyncHandler(
  async (req: Request, res: Response) => {
    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET!
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: MEDIA_MESSAGES.UPLOADSIGNATURE,
        data: {
          timestamp,
          signature,
          apiKey: process.env.CLOUDINARY_API_KEY!,
          cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
        },
      })
    );
  }
);

export const saveMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await Media.create(req.body);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse({
      status: HTTP_STATUS.OK,
      message: MEDIA_MESSAGES.SAVED,
      data: media,
    })
  );
});

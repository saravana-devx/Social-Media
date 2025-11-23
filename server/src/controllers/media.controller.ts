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
      ApiResponse.success(
        {
          timestamp,
          signature,
          apiKey: process.env.CLOUDINARY_API_KEY!,
          cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
        },
        MEDIA_MESSAGES.SIGNATURE_GENERATED
      )
    );
  }
);

export const saveMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await Media.create(req.body);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(ApiResponse.created(media, MEDIA_MESSAGES.SAVED));
});

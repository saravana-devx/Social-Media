import type {
  CloudinarySignatureResponse,
  CloudinaryUploadedMedia,
  SavedMediaInDB,
} from "@/hooks/api/types";
import type { AxiosResponse } from "axios";
import { MediaURL } from "@/api/config";
import { api } from "@/api/config";

async function getSignature(): Promise<CloudinarySignatureResponse> {
  const response: AxiosResponse = await api.get(MediaURL.signature);
  return response.data;
}

// Upload file to Cloudinary
async function uploadToCloudinary(
  file: File,
  sig: CloudinarySignatureResponse
): Promise<CloudinaryUploadedMedia> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("timestamp", sig.timestamp.toString());
  formData.append("signature", sig.signature);
  formData.append("api_key", sig.apiKey);

  const res = await api.post(
    MediaURL.uploadToCloudinary(sig.cloudName),
    formData
  );
  return res.data;
}

const saveMediaInDB = async (
  media: CloudinaryUploadedMedia
): Promise<SavedMediaInDB> => {
  const { data }: AxiosResponse<{ data: SavedMediaInDB }> = await api.post(
    MediaURL.upload,
    media
  );
  return data.data;
};

export const MediaAPI = {
  getSignature,
  uploadToCloudinary,
  saveMediaInDB,
};

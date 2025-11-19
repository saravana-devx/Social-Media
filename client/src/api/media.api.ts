import { type AxiosResponse } from "axios";
import api from "@/api/config/axiosConfig";
import type {
  CloudinarySignatureResponse,
  CloudinaryUploadedMedia,
} from "../types/media.types";
import { MediaURL } from "./config/apiEndpoints";

async function getSignature(): Promise<CloudinarySignatureResponse> {
  const response: AxiosResponse = await api.request({
    url: MediaURL.signature,
    method: "GET",
  });
  return response.data.data;
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

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");

  return (await res.json()) as CloudinaryUploadedMedia;
}

// Save media metadata to DB
async function saveMediaInDB(media: CloudinaryUploadedMedia) {
  const response: AxiosResponse = await api.request({
    url: MediaURL.save,
    method: "POST",
    data: media,
  });
  return response.data.data;
}

export const MediaAPI = {
  getSignature,
  uploadToCloudinary,
  saveMediaInDB,
};

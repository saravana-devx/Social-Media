import { useMutation } from "@tanstack/react-query";
import { MediaAPI } from "../api/media.api";
import type { UploadResult } from "../types/media.types";

export const useCloudinaryUpload = () => {
  return useMutation({
    mutationFn: async ({
      file,
      saveToDB = true,
    }: {
      file: File;
      saveToDB?: boolean;
    }): Promise<UploadResult> => {
      const sig = await MediaAPI.getSignature();
      const uploaded = await MediaAPI.uploadToCloudinary(file, sig);

      if (saveToDB) {
        const media = await MediaAPI.saveMediaInDB(uploaded);
        return { uploaded, media };
      }

      return { uploaded };
    },
  });
};

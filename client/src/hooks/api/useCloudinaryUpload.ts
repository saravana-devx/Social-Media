import { useMutation } from "@tanstack/react-query";
import type { UploadResult } from "./types";
import { MediaAPI } from "@/api/shared/media.api";

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
      console.log("file :: ", file ,"\nsig :: ", sig)
      const uploaded = await MediaAPI.uploadToCloudinary(file, sig);
      console.log("uploaded info :: ", uploaded)
      if (saveToDB) {
        const media = await MediaAPI.saveMediaInDB(uploaded);
        return { uploaded, media };
      }

      return { uploaded };
    },
  });
};

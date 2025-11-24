import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCloudinaryUpload } from "@/hooks";
import { toast } from "sonner";

interface PreviewFile extends File {
  preview: string;
}

export function usePostMediaUpload(maxFiles = 5) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const uploadToCloudinary = useCloudinaryUpload();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        toast.error(`Only ${maxFiles} files allowed`);
        return;
      }

      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ) as PreviewFile[];

      setFiles((prev) => [...prev, ...mappedFiles]);
    },
    [files, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: true,
    maxSize: 100 * 1024 * 1024,
  });

  const removeFile = (name: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((file) => file.name !== name);
      const removed = prev.find((file) => file.name === name);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const uploadAll = async (): Promise<string[]> => {
    const uploadedIds: string[] = [];

    for (const file of files) {
      const { media } = await uploadToCloudinary.mutateAsync({
        file,
        saveToDB: true,
      });

      if (!media?._id) {
        toast.error("Some files failed to upload");
        continue;
      }

      uploadedIds.push(media._id);
    }

    return uploadedIds;
  };

  // Clear files and revoke URLs
  const resetFiles = () => {
    setFiles((prev) => {
      prev.forEach((file) => URL.revokeObjectURL(file.preview));
      return [];
    });
  };

  return {
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
    uploadAll,
    resetFiles,
    uploadStatus: uploadToCloudinary.isPending,
  };
}

export type { PreviewFile };

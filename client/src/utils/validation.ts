import { z } from "zod";

export const uploadSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "Please select a file",
    })
    .refine((file: File) => file.size < 10 * 1024 * 1024, {
      message: "File size must be < 10MB",
    }),
});

export type UploadSchema = z.infer<typeof uploadSchema>;

import { z } from "zod";

export const PostEditorSchema = z.object({
  description: z.string().min(2, "Enter at least 2 characters").max(1000),
  mediaIds: z.any(),
});

export type PostEditorPayload = z.infer<typeof PostEditorSchema>;

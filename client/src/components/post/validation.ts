import { z } from "zod";

export const createPostSchema = z.object({
  description: z.string().max(1000),
  media: z.any(),
});

export type CreatePostPayload = z.infer<typeof createPostSchema>;

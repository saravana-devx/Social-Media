import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
    .optional(),
  dob: z.string().min(1, "Date of birth required").optional(),
  location: z.string().optional(),
  about: z.string().max(300, "About must be under 300 characters").optional(),
});

export type EditProfilePayload = z.infer<typeof editProfileSchema>;

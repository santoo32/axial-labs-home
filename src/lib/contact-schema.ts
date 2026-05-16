import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "required").max(100),
  email: z.string().email("invalid email"),
  project: z.enum(["brand", "software", "both", "other"]),
  message: z.string().min(10, "too short").max(2000),
  _hp: z.string().max(0, "bot detected"),
});

export type ContactPayload = z.infer<typeof contactSchema>;

import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(5, "Name must be at least 5 characters.")
    .max(45, "Name must be at most 45 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().refine((phone) => /^\d{10}$/.test(phone), 'Invalid phone number.'),
    })

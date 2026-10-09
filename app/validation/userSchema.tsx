import { string, z } from "zod";

export const UserDataSchema = z
  .object({
    name: z
      .string({ error: "Name should contain only letter" })
      .trim()
      .min(1, "Name is required"),

    email: z
      .string()
      .trim()
      .min(1, "Email is also required")
      .pipe(z.email({ error: "Please enter valid email" })),

    gender: z
      .string({ error: "Please select some option" })
      .trim()
      .min(1, "Please select gender"),
    maritalStatus: z.string({ error: "Please select some option" }),
    bloodGroup: z.string({ error: "Please select some option" }),
    interested: z.array(string({ error: "Please select some option" }), {
      error: "Please select some option",
    }),
    dob: z.iso
      .date({ error: "Please Select or enter DOB" })
      .refine((d) => d <= new Date().toISOString().slice(0, 10), {
        error: "Date of birth cannot be in the future",
      }),

    description: z.string().min(1, { error: "Please enter some description" }),
    password: z
      .string()
      .min(1, { error: "Please enter password" })
      .min(8, { error: "Password must be of min 8 words" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please enter confirm password" }),
    image: z
      .custom<FileList>()
      .refine((files) => files?.length > 0, { error: "Please add some image" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password & Confirm Password must be same",
    path: ["confirmPassword"],
  });

export type UserDataSchemaTypes = z.infer<typeof UserDataSchema>;

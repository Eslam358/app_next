import { z } from "zod";

export const schemaArticle = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .nonempty()
    .max(100, " Name must be less than 100 characters")
    .min(3),
  description: z.string().nonempty(),
});

export const schemaUserRegister=z.object({
  username:z.string().nonempty().min(3).max(20),
  email:z.string().nonempty().email(),
  password:z.string().nonempty().min(8),
})

export const schemaUserSinIn=z.object({
  email:z.string().nonempty().email(),
  password:z.string().nonempty().min(8),
})
export const schemaUserUpdate=z.object({
  username:z.string().nonempty().min(3).max(20),
  password:z.string().nonempty().min(8),
})


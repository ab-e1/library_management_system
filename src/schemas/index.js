const { z } = require("zod");

const bookSchema = z.object({
  title: z.string().min(1, "title cannot be empty"),
  author: z.string().min(1, "author cannot be empty"),
  genre: z.string().min(1, "genre cannot be empty"),
  year: z.number().int().positive("year must be positive"),
  copies: z.number().int().positive("copies must be positive"),
});

const memberSchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  email: z.string().email("invalid email format"),
  password: z
    .string()
    .min(8, "password must be 8 characters long")
    .regex(/[A-Z]/, "password must contain atleast one capital letter")
    .regex(/[a-z]/, "password must contain atleast oe small letter")
    .regex(/\d/, "password must contain atleast one number")
    .regex(
      /[!@#$%^&*-]/,
      "password must contain atleat one special character ",
    ),
});

module.exports = { bookSchema, memberSchema };

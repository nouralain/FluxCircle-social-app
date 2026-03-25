import * as zod from "zod";

export const zodLoginFormScheme = zod.object({
  email: zod.email("Email is required"),
  password: zod
    .string()
    .nonempty("Password is required")
    .min(8, "Password too short"),
});
import * as zod from "zod";
export const zodFormScheme = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name mut be less that 20 characters"),
    email: zod.email("Email is required"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Waek password",
      ),
    rePassword: zod.string().nonempty("confirm password is required"),
    dateOfBirth: zod.coerce
      .date()
      .refine((value) => {
        return new Date().getFullYear() - value.getFullYear() >= 18;
      }, "Age must be more than 17 years")
      .transform((valueBeforeTransform) =>
        valueBeforeTransform.toLocaleDateString("sv-SE"),
      ),
    gender: zod.enum(["male", "female"], "Gender is required"),
  })
  .refine(
    ({ password, rePassword }) => {
      return password === rePassword;
    },
    { path: "rePassword", error: "Repassword does not match password" },
  );
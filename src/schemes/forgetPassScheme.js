import * as zod from "zod";
export const zodChangePassScheme = zod.object({
  password:zod.string().nonempty("Current password is required."),
  newPassword: zod
      .string()
      .nonempty("New password is required.")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Waek password",
      ),
    confPassword: zod.string().nonempty("Please confirm your new password."),
    }).refine(({newPassword,confPassword})=>newPassword===confPassword , {path:"confPassword" , error:"Passwords do not match."})


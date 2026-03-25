import { Button, Form, Input } from "@heroui/react";
import { IoKeyOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodChangePassScheme } from "../../schemes/forgetPassScheme";
import { changePassword } from "../../api/auth.api";

export default function ForgetPassword() {
const {handleSubmit ,register,formState:{errors} }=useForm({defaultValues: {
      password: "",
      newPassword: "",
      confPassword:""
    },resolver: zodResolver(zodChangePassScheme), mode:"all"})

async function changePass({password,newPassword}){
    const userData={
        password,
        newPassword
    }
   console.log(await changePassword(userData));
   
     
    
}
  return (
    <main className="h-screen bg-graay-700 flex items-center justify-center">
      <Form onSubmit={handleSubmit(changePass)} className=" p-8 mx-5 bg-white rounded-2xl w-full max-w-5xl border border-gray-300 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex size-10 rounded-full bg-secondary-100 items-center justify-center">
            <IoKeyOutline color="blue" />
          </span>
          <div>
            <h1 className="font-extrabold text-xl">Change Password</h1>
            <p className="text-graay-500 text-sm">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-col my-6 w-full">
          <Input
              {...register("password")}
              autoComplete="new-password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            label="Current password :"
            labelPlacement="outside"
            placeholder="Enter current password"
            type="password"
            classNames={{
              label: " lg:text-sm font-bold",
              inputWrapper: "bg-white/20 ",
              input: "placeholder:text-gray/70",
            }}
          />
          <Input
              {...register("newPassword")}
              autoComplete="new-password"
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword?.message}
            label="New password :"
            labelPlacement="outside"
            placeholder="Enter new password"
            type="password"
            classNames={{
              label: " lg:text-sm font-bold",
              inputWrapper: "bg-white/20 ",
              input: "placeholder:text-gray/70",
            }}
          />

          <Input
              {...register("confPassword")} 
              autoComplete="new-password"
              isInvalid={!!errors.confPassword}
              errorMessage={errors.confPassword?.message}
            label="Confirm new password :"
            labelPlacement="outside"
            placeholder="Re-enter new password"
            type="password"
            classNames={{
              label: " lg:text-sm font-bold",
              inputWrapper: "bg-white/20 ",
              input: "placeholder:text-gray/70",
            }}
          />
        </div>

 <Button
              type="submit"
              className="w-full bg-secondary-800  text-white font-bold"
            >Update password</Button>   
               </Form>
    </main>
  );
}

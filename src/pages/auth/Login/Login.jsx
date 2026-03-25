import { Button, Form, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import loginBg from "../../../assets/boliviainteligente-46MZbf_9P5I-unsplash.jpg";
import { GiHolosphere } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { zodLoginFormScheme } from "../../../schemes/loginSchema";
import { authContext } from "../../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { login } from "../../../api/auth.api";




export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(zodLoginFormScheme),
  });

  const [loading, setLoading] = useState(false);

  const {setUserToken} =useContext(authContext)
  async function userLogIn(x) {

    setLoading(true);
    toast.promise(
     login(x),
      {
        loading: "Saving...",
        success: (response) => {
          setLoading(false);
          localStorage.setItem("token" , response.data.data.token)
setUserToken(response.data.data.token)

          return response.data.message;
        },
        error: (response) => {
          setLoading(false);

          return response.response.data.errors;
        },
      },
      { duration: 2000 },
    );
   
  }

  return (
    <>
      <div className="flex flex-col  lg:flex-row min-h-screen  ">
        <div
          className="h-55 lg:h-auto lg:w-5/12 mt-20 lg:mt-25 bg-cover bg-center lg:rounded-2xl lg:mb-5 lg:ms-5 relative "
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <GiHolosphere
            size={50}
            color="white"
            className="hidden lg:inline absolute left-20 top-10"
          />
          <div className="hidden text-white ms-20 h-full lg:flex flex-col justify-center  ">
            <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl mb-10 ">
              Hello, <br />
              Welcome
            </h2>

            <p className=" text-sm md:text-base lg:text-lg">
              Connect with your people again. Pick up right <br /> where you
              left off.
            </p>
          </div>
        </div>

        <Form
          onSubmit={handleSubmit(userLogIn)}
          className=" relative z-20   bg-white lg:bg-transparent -mt-7 lg:mt-0 w-full shadow-[0_1px_40px_rgba(0,0,0,1)]
           lg:shadow-none px-15 md:px-30 lg:px-0  rounded-4xl lg:rounded-none  min-h-screen
            lg:max-w-xl mx-auto flex flex-col  gap-7 items-center justify-center  "
        >
          <div className="text-center">
            <h1 className="font-bold text-3xl self-center  text-black">
              Welcome back
            </h1>
            <p className="text-gray-500">Log in to continue your journey.</p>
          </div>
          <Input
            {...register("email")}
            autoComplete="username"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            label="Email :"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            classNames={{ label: "text-black! text-lg font-semibold" }}
          />

          <Input
            {...register("password")}
            autoComplete="new-password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            label="Password :"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
            classNames={{ label: "text-black! text-lg font-semibold" }}
          />
          <NavLink className="self-end text-blue-700 hover:underline hover:cursor-pointer">Forgot password?</NavLink>

          <div className="flex gap-4 w-full">
            <Button
              type="submit"
              className="w-full bg-[#10172A]  text-white font-bold"
              isLoading={loading}
            >
              Log in
            </Button>
            <Button
              type="reset"
              variant="flat"
              className="w-full bg-white font-bold "
              onClick={() => reset()}
            >
              Reset
            </Button>
          </div>

          <div class="flex items-center w-full">
            <div class="flex-1 h-px bg-gray-300"></div>
            <span class="px-4 text-gray-500">or continue with</span>
            <div class="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex gap-4 w-full">
            <Button
              variant="bordered"
              className="w-full font-semibold"
             
            >
              <FcGoogle size={20} />

              Google
            </Button>
            <Button
              
              variant="bordered"
              className="w-full bg-white font-semibold "
              
            >
              <FaApple size={20} />

              Apple
            </Button>
          </div>
          <p className="text-gray-500">Don't have an account? <NavLink to={"/register"} className=" text-blue-700 hover:underline hover:cursor-pointer">Sign up</NavLink></p>
        </Form>
      </div>
    </>
  );
}

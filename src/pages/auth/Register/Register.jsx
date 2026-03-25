import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import regBg from "../../../assets/boliviainteligente-46MZbf_9P5I-unsplash.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { zodFormScheme } from "../../../schemes/registerSchema";
import { authContext } from "../../../contexts/AuthContext";
import { resgister } from "../../../api/auth.api";



export default function Register() {

  // react hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "all",
    resolver: zodResolver(zodFormScheme),
  });

  // submit button loading
  const [loading, setLoading] = useState(false);


  // token context 
 const {setUserToken}= useContext(authContext)

  //send user data 
  async function userRegister(x) {
    setLoading(true);
    toast.promise(
     resgister(x),
      {
        
        loading: "Saving...",
        success: (response) => {
          setLoading(false);
          setUserToken(response.data.data.token)
          localStorage.setItem("token",response.data.data.token)
          
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
      <div
        className="mt-20  bg-cover bg-center overflow-auto flex flex-col items-center lg:flex-row "
        style={{
          height: "calc(100vh - 80px)",
          backgroundImage: `url(${regBg})`,
        }}
      >
        <div className="text-white lg:ms-20">
          <h2 className="font-bold mt-8 lg:mt-0 text-2xl md:text-3xl lg:text-4xl xl:text-6xl mb-5 text-center lg:text-start">
            Create your account <br /> to get started
          </h2>
          <p className="hidden  lg:block lg:text-base xl:text-lg">
            Join our community today and create your account to unlock full
            access <br /> to all features.
          </p>
        </div>
        <Form
          onSubmit={handleSubmit(userRegister)}
          className="w-full mb-10 lg:mb-0  max-w-sm md:max-w-xl lg:max-w-2xl flex flex-col gap-7  lg:ms-auto lg:me-20 bg-transparent backdrop-blur-2xl p-7 rounded-3xl  shadow-2xl "
        >
          
          <Input
            {...register("name")}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            label="Name :"
            labelPlacement="outside"
            placeholder="Enter your username"
            type="text"
            classNames={{ label: "text-white! lg:text-base font-medium" ,inputWrapper:"bg-white/20 ",input:"placeholder:text-white/70"}}
          />

          <Input
            {...register("email")}
            autoComplete="username"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            label="Email :"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            classNames={{ label: "text-white! lg:text-base font-medium",inputWrapper:"bg-white/20 ",input:"placeholder:text-white/70" }}
          />

          <div className="flex justify-between items-center w-full gap-4">
            <Input
              {...register("password")}
              autoComplete="new-password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              label="Password :"
              labelPlacement="outside"
              placeholder="Enter your password"
              type="password"
              classNames={{ label: "text-white! lg:text-base font-medium",inputWrapper:"bg-white/20 ",input:"placeholder:text-white/70" }}
            />

            <Input
              {...register("rePassword")}
              autoComplete="new-password"
              isInvalid={!!errors.rePassword}
              errorMessage={errors.rePassword?.message}
              label="Repassword :"
              labelPlacement="outside"
              placeholder="Enter your RePassword"
              type="password"
              classNames={{ label: "text-white! lg:text-base font-medium",inputWrapper:"bg-white/20 ",input:"placeholder:text-white/70"}}
            />
          </div>

          <div className="flex justify-between items-center w-full gap-4">
            <Input
              {...register("dateOfBirth")}
              isInvalid={!!errors.dateOfBirth}
              errorMessage={errors.dateOfBirth?.message}
              label="Date Of Birth :"
              labelPlacement="outside"
              placeholder="Enter your Date Of Birth"
              type="date"
              variant="flat"
              classNames={{ label: "text-white! lg:text-base font-medium" , inputWrapper:"bg-white/20"  }}
            />

            <Select
              {...register("gender")}
              isInvalid={!!errors.gender}
              errorMessage={errors.gender?.message}
              className="max-w-xl"
              labelPlacement="outside"
              label="Gender"
              placeholder="Select your Gender"
              classNames={{ label: "text-white! lg:text-base font-medium" ,trigger:"bg-white/20 ",input:"placeholder:text-white/70" ,value: "text-white/70"}}
            >
              <SelectItem key={"male"}> Male</SelectItem>
              <SelectItem key={"female"}>Female</SelectItem>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <Button
              type="submit"
              className="w-full bg-[#8B4DEE]  text-white font-bold"
              isLoading={loading}
            >
              Submit
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
                      <div class="flex-1 h-px bg-gray-500"></div>
                      <span class="px-4 text-gray-300">or continue with</span>
                      <div class="flex-1 h-px bg-gray-500"></div>
                    </div>
          
                    <div className="flex gap-4 w-full">
                      <Button
                        variant="bordered"
                        className="w-full font-semibold text-white"
                       
                      >
                        <FcGoogle size={20} />
          
                        Google
                      </Button>
                      <Button
                        
                        variant="bordered"
                        className="w-full text-white font-semibold "
                        
                      >
                        <FaApple size={20} />
          
                        Apple
                      </Button>
                    </div>
        </Form>
      </div>
    </>
  );
}

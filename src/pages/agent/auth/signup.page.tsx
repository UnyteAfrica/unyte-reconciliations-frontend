import { FormEventHandler } from "react";

import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";

const formSchema = z.object({
  username: z.string().min(3, "Username cannot be less than 3 characters"),
  gampId: z.string().min(5, "GAMP ID cannot be less than 5 characters"),
  password: z.string().min(6, "Passwrod cannot be less than 6 characters"),
});

export const AgentSignupPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      gampId: "",
      password: "",
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Log in form submitted");
  };

  return (
    <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white flex justify-center items-center w-[720px] h-[750px] rounded-2xl">
        <form onSubmit={handleSubmit} className="text-[#333] w-[560px]">
          <header>
            <p className="text-center mb-11 font-medium text-[28px]">
              Agent Signup
            </p>
            <p className="mb-11 text-xl">
              Create your account by entering a username and password.
            </p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="Username"
              placeholder="tobi42"
              error={errors.gampId?.message?.toString()}
              {...register("gampId")}
            />
            <CustomInput
              label="GAMP ID"
              placeholder="A034529"
              error={errors.gampId?.message?.toString()}
              {...register("gampId")}
            />
            <PasswordInput
              placeholder="******"
              error={errors.password?.message?.toString()}
              {...register("password")}
            />
            <div>
              <p className="mb-2">
                Already have an account?{" "}
                <Link
                  to={BrowserComboRoutes.agentLogin}
                  className="text-primary"
                >
                  Sign In
                </Link>
              </p>
              <button className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

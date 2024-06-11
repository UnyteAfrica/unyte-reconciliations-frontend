import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    username: z.string().min(3, "Username cannot be less than 3 characters"),
    gampId: z.string().min(5, "GAMP ID cannot be less than 5 characters"),
    password: z.string().min(6, "Password cannot be less than 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const AgentSignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      gampId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white w-[720px] overflow-y-auto h-[750px] rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[#333] w-[560px] mx-auto my-10"
        >
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
              error={errors.username?.message?.toString()}
              {...register("username")}
            />
            <CustomInput
              label="GAMP ID"
              placeholder="A034529"
              error={errors.gampId?.message?.toString()}
              {...register("gampId")}
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              error={errors.password?.message?.toString()}
              {...register("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="******"
              error={errors.confirmPassword?.message?.toString()}
              {...register("confirmPassword")}
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

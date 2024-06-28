import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Admin Email is invalid"),
  password: z.string().min(6, "Password cannot be less than 6 characters"),
});

export const CompanyLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white flex justify-center items-center w-[700px] h-[700px] rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[#333] w-[560px]"
        >
          <header>
            <p className="text-center mb-11 font-medium text-[28px]">
              Company Login
            </p>
            <p className="mb-11 text-xl">Sign in to your account.</p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="Admin Email"
              placeholder="johndoe@gmail.com"
              error={errors.email?.message?.toString()}
              {...register("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              error={errors.password?.message?.toString()}
              {...register("password")}
            />
            <div>
              <p className="mb-2">
                Don&apos;t have an account?{" "}
                <Link
                  to={BrowserComboRoutes.companySignup}
                  className="text-primary"
                >
                  Sign up
                </Link>
              </p>
              <div className="flex justify-end">
                <Link
                  to={BrowserComboRoutes.companyForgotPassword}
                  className="text-primary mb-2 inline-block"
                >
                  Forgotten Password?
                </Link>
              </div>
              <button className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

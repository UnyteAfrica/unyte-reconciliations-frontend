import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { Loader } from "@/components/loader";
import { useContext } from "react";
import { useMediaQuery } from "@/utils/hooks";
import { Icon } from "@/components/shared/icon";
import { logger } from "@/utils/logger";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/auth.context";
import { LoginType } from "@/types/request.types";
import { login } from "@/services/api/api-base";

const formSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password cannot be less than 6 characters"),
});

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setEmail } = useContext(AuthContext);

  const navigate = useNavigate();

  const { mutate: mLogin, isPending: isLoginLoading } = useMutation({
    mutationKey: [MutationKeys.login],
    mutationFn: (data: LoginType) => login(data),
    onSuccess: (data) => {
      logger.log(data);
      toast.success("Please enter the OTP sent to your email");
      setEmail(getValues("email"));
      logger.log("hello");
      navigate(BrowserRoutes.verify);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mLogin(data);
  };

  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <div>
      {!isMediaQueryMatched && (
        <div className="px-5 py-10 max-w-[600px] min-h-svh mx-auto flex flex-col">
          <Icon type="logo" className="block w-28" />
          <div className="grow" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <header>
              <p className="mb-2 font-semibold text-[20px]">Login</p>

              <p className="mb-6 text-sm text-[#4F4F4F]">
                Sign in to your account.
              </p>
            </header>
            <div className="space-y-6">
              <CustomInput
                label="Email"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                placeholder="johndoe@gmail.com"
                error={errors.email?.message?.toString()}
                {...register("email")}
              />
              <div>
                <PasswordInput
                  placeholder="******"
                  labelClassName="text-sm text-[#333"
                  className="p-2 h-[58px] border-[#E0E0E0]"
                  inputClassname="h-[56px]"
                  error={errors.password?.message?.toString()}
                  {...register("password")}
                />
                <div className="mt-2">
                  <Link
                    to={BrowserRoutes.forgotPassword}
                    className="text-mPrimary text-sm mb-2 inline-block"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[58px] text-white rounded-2xl"
                  disabled={isLoginLoading}
                  id="submit"
                >
                  {isLoginLoading ? (
                    <Loader className="mx-auto h-6 w-6" />
                  ) : (
                    "Sign In"
                  )}
                </button>
                {/* <p className="mt-2 text-sm text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    to={BrowserComboRoutes.companySignup}
                    className="text-mPrimary"
                  >
                    Sign up
                  </Link>
                </p> */}
              </div>
            </div>
          </form>
          <div className="grow" />
        </div>
      )}
      {isMediaQueryMatched && (
        <div className="flex justify-center items-center  bg-[#E9FCE8] min-h-screen">
          <div className="p-10 bg-white flex justify-center items-center w-[700px] h-[700px] rounded-2xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-[#333] w-[560px]"
            >
              <header>
                <p className="text-center mb-11 font-medium text-[28px]">
                  Login
                </p>
                <p className="mb-11 text-xl">Sign in to your account.</p>
              </header>
              <div className="space-y-6">
                <CustomInput
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  error={errors.email?.message?.toString()}
                  {...register("email")}
                />
                <div className="">
                  <PasswordInput
                    label="Password"
                    placeholder="******"
                    error={errors.password?.message?.toString()}
                    {...register("password")}
                  />

                  <Link
                    to={BrowserRoutes.forgotPassword}
                    className="text-mPrimary mt-2 inline-block"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div>
                  <button
                    className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[72px] text-white rounded-2xl"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? (
                      <Loader className="mx-auto h-6 w-6" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                  {/* <p className="mt-2 text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      to={BrowserComboRoutes.companySignup}
                      className="text-mPrimary"
                    >
                      Sign up
                    </Link>
                  </p> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

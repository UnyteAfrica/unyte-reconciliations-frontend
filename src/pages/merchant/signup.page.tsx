import { CustomInput, PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader } from "@/components/loader";
import toast from "react-hot-toast";
import { MerchantSignupType } from "@/types/request.types";
import { useMediaQuery } from "@/utils/hooks";
import { Icon } from "@/components/shared/icon";
import { logger } from "@/utils/logger";
import { useMutation } from "@tanstack/react-query";

const formSchema = z
  .object({
    merchantEmail: z.string().email("The email you entered is invalid"),
    password: z.string().min(6, "Password cannot be less than 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const MerchantSignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      merchantEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data: MerchantSignupType) =>
      new Promise((res) => {
        res(data);
      }),
    onSuccess: (data) => {
      logger.log(data);
      toast.success("Account created successfully");
      navigate(BrowserRoutes.login);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signup({
      email: data.merchantEmail,
      password: data.password,
    });
  };

  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <div>
      {!isMediaQueryMatched && (
        <div className="px-5 py-10 max-w-[600px] mx-auto">
          <Icon type="logo" className="mb-6 block" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <header>
              <p className="mb-2 font-semibold text-[20px]">Merchant Signup</p>
              <p className="mb-6 text-sm text-[#4F4F4F]">
                Create your account by entering your email and password.
              </p>
            </header>
            <div className="space-y-6">
              <CustomInput
                label="Merchant Email"
                placeholder="insurancefirm@company.com"
                labelClassName="text-sm text-[#333"
                className="h-[58px] border-[#E0E0E0]"
                error={errors.merchantEmail?.message?.toString()}
                {...register("merchantEmail")}
              />

              <PasswordInput
                label="Password"
                placeholder="******"
                labelClassName="text-sm text-[#333"
                className="p-2 h-[58px] border-[#E0E0E0]"
                inputClassname="h-[56px]"
                error={errors.password?.message?.toString()}
                {...register("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="******"
                labelClassName="text-sm text-[#333"
                className="p-2 h-[58px] border-[#E0E0E0]"
                inputClassname="h-[56px]"
                error={errors.confirmPassword?.message?.toString()}
                {...register("confirmPassword")}
              />
              <div>
                <p className="mb-2 text-sm">
                  Already have an account?{" "}
                  <Link to={BrowserRoutes.login} className="text-mPrimary">
                    Sign In
                  </Link>
                </p>
                <button
                  className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[58px] text-white rounded-2xl"
                  disabled={isPending}
                >
                  {isPending ? <Loader className="mx-auto" /> : "Sign Up"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {isMediaQueryMatched && (
        <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
          <div className="p-10 bg-white w-[720px] overflow-y-auto h-[750px] rounded-2xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-[#333] w-[560px] mx-auto my-10"
              noValidate
            >
              <header>
                <p className="text-center mb-11 font-medium text-[28px]">
                  Merchant Signup
                </p>
                <p className="mb-11 text-xl">
                  Create your account by entering a username and password.
                </p>
              </header>
              <div className="space-y-6">
                <CustomInput
                  label="Merchant Email"
                  placeholder="insurancefirm@company.com"
                  error={errors.merchantEmail?.message?.toString()}
                  {...register("merchantEmail")}
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
                    <Link to={BrowserRoutes.login} className="text-mPrimary">
                      Sign In
                    </Link>
                  </p>
                  <button
                    className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[72px] text-white rounded-2xl"
                    disabled={isPending}
                  >
                    {isPending ? <Loader className="mx-auto" /> : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

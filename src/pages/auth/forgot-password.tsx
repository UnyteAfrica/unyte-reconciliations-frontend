import { CustomInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BrowserRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { Loader } from "@/components/loader";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/utils/hooks";
import { Icon } from "@/components/shared/icon";
import { logger } from "@/utils/logger";
import { forgotPassword } from "@/services/api/api-base";

const formSchema = z.object({
  email: z.string().email("Invalid email entered"),
});

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: mForgotPassword, isPending: isLoadingForgotPassword } =
    useMutation({
      mutationKey: [MutationKeys.agentForgotPassword],
      mutationFn: (email: string) => forgotPassword(email),
      onSuccess: (data) => {
        logger.log(data);
        toast.success(data.data.message);
      },
    });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    logger.log(data);
    mForgotPassword(data.email);
  };

  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div className="px-5 py-10 max-w-[600px] min-h-svh mx-auto flex flex-col ">
        <Icon type="logo" className="mb-6 block w-28" />
        <div className="grow" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <header>
            <p className="mb-2 font-semibold text-[20px] text-center">
              Forgot Password
            </p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="Email"
              placeholder="johndoe@gmail.com"
              labelClassName="text-sm text-[#333"
              className="p-2 h-[58px] border-[#E0E0E0]"
              error={errors.email?.message?.toString()}
              {...register("email")}
            />
            <div>
              <p className="mb-2 text-sm">
                Already have an account?{" "}
                <Link to={BrowserRoutes.login} className="text-mPrimary">
                  Log In
                </Link>
              </p>
              <button
                className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[58px] text-white rounded-2xl"
                disabled={isLoadingForgotPassword}
              >
                {isLoadingForgotPassword ? (
                  <Loader className="mx-auto" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="grow" />
      </div>
    );

  return (
    <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white flex justify-center items-center w-[700px] h-[500px] rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[#333] w-[560px]"
        >
          <header>
            <p className="text-center mb-11 font-medium text-[28px]">
              Forgot Password
            </p>
          </header>
          <div className="space-y-6">
            <CustomInput
              label="Email"
              placeholder="johndoe@gmail.com"
              error={errors.email?.message?.toString()}
              {...register("email")}
            />
            <div>
              <p className="mb-2">
                Already have an account?{" "}
                <Link to={BrowserRoutes.login} className="text-mPrimary">
                  Log In
                </Link>
              </p>
              <button
                className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[72px] text-white rounded-2xl"
                disabled={isLoadingForgotPassword}
              >
                {isLoadingForgotPassword ? (
                  <Loader className="mx-auto" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

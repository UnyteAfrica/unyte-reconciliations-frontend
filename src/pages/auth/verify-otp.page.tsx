import { PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { useContext, useEffect } from "react";
import { Loader } from "@/components/loader";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/utils/hooks";
import { Icon } from "@/components/shared/icon";
import { logger } from "@/utils/logger";
import { LocalStorage } from "@/services/local-storage";
import { VerifyOTPType } from "@/types/request.types";
import { resendOTP, verifyOTP } from "@/services/api/api-base";
import { AuthContext } from "@/context/auth.context";
import { UserType } from "@/types/types";

const formSchema = z.object({
  otp: z.string().min(6, "OTP cannot be less than 6 characters"),
});

export const VerifyOTPPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const navigate = useNavigate();
  const { email, setEmail, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!email) navigate(BrowserRoutes.login);
  }, [email]);

  const { mutate: mVerifyOTP, isPending: isVerificationLoading } = useMutation({
    mutationKey: [MutationKeys.agentVerify],
    mutationFn: (data: VerifyOTPType) => verifyOTP(data),
    onSuccess: (data) => {
      logger.log(data);
      toast.success("OTP verified");
      LocalStorage.setItem("accessToken", data.data.access_token);
      LocalStorage.setItem("refreshToken", data.data.refresh_token);
      LocalStorage.setItem("userType", data.data.USER_TYPE);
      setIsLoggedIn(true);
      setEmail("");
      // navigate(BrowserComboRoutes.agentOverview);
      switch (data.data.USER_TYPE) {
        case UserType.INSURER:
          navigate(BrowserComboRoutes.companyOverview);
          LocalStorage.setItem("uid", data.data.INSURER_ID);
          break;
        case UserType.AGENT:
          navigate(BrowserComboRoutes.agentOverview);
          LocalStorage.setItem("uid", data.data.AGENT_ID);
          break;
        case UserType.MERCHANT:
          navigate(BrowserComboRoutes.merchantOverview);
          LocalStorage.setItem("uid", data.data.MERCHANT_ID);
          break;
      }
    },
  });

  const { mutate: mResendOTP, isPending: isResendLoading } = useMutation({
    mutationKey: [MutationKeys.agentResendOTP],
    mutationFn: (email: string) => resendOTP(email),
    onSuccess: (data) => {
      logger.log(data);
      toast.success(data.data.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    logger.log(data);
    mVerifyOTP({
      email: email,
      otp: data.otp,
    });
  };

  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div className="px-5 py-10 max-w-[600px] mx-auto min-h-svh flex flex-col">
        <Icon type="logo" className="mb-6 block w-28" />
        <div className="grow" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <header>
            <p className="mb-2 font-semibold text-[20px] text-center">
              Verify OTP
            </p>
          </header>
          <div className="space-y-6">
            <PasswordInput
              label="OTP"
              placeholder="******"
              labelClassName="text-sm text-[#333"
              className="p-2 h-[58px] border-[#E0E0E0]"
              inputClassname="h-[56px]"
              error={errors.otp?.message?.toString()}
              {...register("otp")}
            />
            <div>
              <div
                className="text-mPrimary mb-2"
                onClick={(e) => {
                  if (isResendLoading) return;
                  e.preventDefault();
                  e.stopPropagation();
                  mResendOTP(email);
                }}
              >
                {isResendLoading ? (
                  <Loader className="mx-auto" />
                ) : (
                  "Resend OTP"
                )}
              </div>
              <button
                className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[58px] text-white rounded-2xl"
                disabled={isVerificationLoading}
              >
                {isVerificationLoading ? (
                  <Loader className="mx-auto" />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="grow" />
      </div>
    );

  return (
    <>
      <div className="flex justify-center items-center  bg-[#f5f5f5] min-h-screen">
        <div className="p-10 bg-white flex justify-center items-center w-[700px] h-[500px] rounded-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-[#333] w-[560px]"
          >
            <header>
              <p className="text-center mb-11 font-medium text-[28px]">
                Verify OTP
              </p>
            </header>
            <div className="space-y-6">
              <PasswordInput
                label="OTP"
                placeholder="******"
                error={errors.otp?.message?.toString()}
                {...register("otp")}
              />
              <div>
                <button
                  className="text-mPrimary mb-2"
                  onClick={(e) => {
                    if (isResendLoading) return;
                    e.preventDefault();
                    e.stopPropagation();
                    mResendOTP(email);
                  }}
                >
                  {isResendLoading ? (
                    <Loader className="mx-auto" />
                  ) : (
                    "Resend OTP"
                  )}
                </button>
                <button
                  className="w-full font-medium text-xl leading-[24px] bg-mPrimary h-[72px] text-white rounded-2xl"
                  disabled={isVerificationLoading}
                >
                  {isVerificationLoading ? (
                    <Loader className="mx-auto" />
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

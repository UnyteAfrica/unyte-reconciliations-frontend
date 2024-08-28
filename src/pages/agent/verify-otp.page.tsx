import { PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { agentResendOTP, agentVerifyOTP } from "@/services/api/api-agent";
import { AgentVerifyOTPType } from "@/types/request.types";
import { useContext, useEffect } from "react";
import { AgentContext } from "@/context/agent.context";
import { Loader } from "@/components/loader";
import { BrowserComboRoutes } from "@/utils/routes";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/utils/hooks";
import { Icon } from "@/components/shared/icon";
import { logger } from "@/utils/logger";

const formSchema = z.object({
  otp: z.string().min(6, "OTP cannot be less than 6 characters"),
});

export const AgentVerifyOTPPage = () => {
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
  const { agentEmail } = useContext(AgentContext);

  useEffect(() => {
    if (!agentEmail) navigate(BrowserComboRoutes.agentLogin);
  }, [agentEmail]);

  const { mutate: mVerifyOTP, isPending: isVerificationLoading } = useMutation({
    mutationKey: [MutationKeys.agentVerify],
    mutationFn: (data: AgentVerifyOTPType) => agentVerifyOTP(data),
    onSuccess: (data) => {
      logger.log(data);
      toast.success(data.data.message);
      navigate(BrowserComboRoutes.agentOverview);
    },
  });

  const { mutate: mResendOTP, isPending: isResendLoading } = useMutation({
    mutationKey: [MutationKeys.agentResendOTP],
    mutationFn: (email: string) => agentResendOTP(email),
    onSuccess: (data) => {
      logger.log(data);
      toast.success(data.data.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    logger.log(data);
    mVerifyOTP({
      email: agentEmail,
      otp: data.otp,
    });
  };

  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div className="px-5 py-10 max-w-[600px] mx-auto min-h-screen flex flex-col">
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
              <button
                className="text-mPrimary mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  mResendOTP(agentEmail);
                }}
                disabled={isResendLoading}
              >
                {isResendLoading ? (
                  <Loader className="mx-auto" />
                ) : (
                  "Resend OTP"
                )}
              </button>
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
                    e.preventDefault();
                    e.stopPropagation();
                    mResendOTP(agentEmail);
                  }}
                  disabled={isResendLoading}
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

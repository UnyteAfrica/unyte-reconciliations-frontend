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
      console.log(data);
      toast.success(data.data.message);
      navigate(BrowserComboRoutes.agentOverview);
    },
  });

  const { mutate: mResendOTP, isPending: isResendLoading } = useMutation({
    mutationKey: [MutationKeys.agentResendOTP],
    mutationFn: (email: string) => agentResendOTP(email),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    mVerifyOTP({
      email: agentEmail,
      otp: data.otp,
    });
  };

  return (
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
                className="text-primary mb-2"
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
                className="w-full font-medium text-xl leading-[24px] bg-primary h-[72px] text-white rounded-2xl"
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
  );
};

import { PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { companyResendOTP, companyVerifyOTP } from "@/api/api-company";
import { CompanyVerifyOTPType } from "@/types/request.types";
import { useNavigate } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { Loader } from "@/components/loader";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { CompanyContext } from "@/context/company.context";

const formSchema = z.object({
  otp: z.string().min(6, "OTP cannot be less than 6 characters"),
});

export const CompanyVerifyOTPPage = () => {
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

  const { companyEmail, setCompanyEmail } = useContext(CompanyContext);

  useEffect(() => {
    if (!companyEmail) navigate(BrowserComboRoutes.companyLogin);
  }, []);

  const { mutate: mVerify, isPending: isVerificationLoading } = useMutation({
    mutationKey: [MutationKeys.companyVerify],
    mutationFn: (data: CompanyVerifyOTPType) => companyVerifyOTP(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("OTP verified");
      navigate(BrowserComboRoutes.companyOverview);
      setCompanyEmail("");
    },
    onError: (err) => {
      console.log(err);
      if (isAxiosError(err)) {
        if (err.response?.status == 400) {
          toast.error(err.response.data.error);
        }
      }
    },
  });
  const { mutate: mResendOTP, isPending: isResendLoading } = useMutation({
    mutationKey: [MutationKeys.companyVerify],
    mutationFn: (email: string) => companyResendOTP(email),
    onSuccess: (data) => {
      console.log(data);
      const message = data.data.message;
      toast.success(message);
    },
    onError: (err) => {
      console.log(err);
      if (isAxiosError(err)) {
        if (err.response?.status == 400) {
          toast.error(err.response.data.error);
        }
      }
    },
  });

  const onSubmit = ({ otp }: z.infer<typeof formSchema>) => {
    mVerify({
      otp,
      email: companyEmail,
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
                disabled={isResendLoading}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  mResendOTP(companyEmail);
                }}
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

import { PasswordInput } from "@/components/shared/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/utils/mutation-keys";
import { companyResendOTP, companyVerifyOTP } from "@/services/api/api-company";
import { CompanyVerifyOTPType } from "@/types/request.types";
import { useNavigate } from "react-router-dom";
import { BrowserComboRoutes } from "@/utils/routes";
import { Loader } from "@/components/loader";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { CompanyContext } from "@/context/company.context";
import { useMediaQuery } from "@/utils/hooks";
import { Icon } from "@/components/shared/icon";
import { logger } from "@/utils/logger";
import { LocalStorage } from "@/services/local-storage";

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

  const { companyEmail, setCompanyEmail, setIsLoggedIn } =
    useContext(CompanyContext);

  useEffect(() => {
    if (!companyEmail) navigate(BrowserComboRoutes.companyLogin);
  }, []);

  const { mutate: mVerify, isPending: isVerificationLoading } = useMutation({
    mutationKey: [MutationKeys.companyVerify],
    mutationFn: (data: CompanyVerifyOTPType) => companyVerifyOTP(data),
    onSuccess: (data) => {
      logger.log(data);
      toast.success("OTP verified");
      LocalStorage.setItem("companyAccessToken", data.data.access_token);
      LocalStorage.setItem("companyRefreshToken", data.data.refresh_token);
      setIsLoggedIn(true);
      navigate(BrowserComboRoutes.companyOverview);
      setCompanyEmail("");
    },
  });
  const { mutate: mResendOTP, isPending: isResendLoading } = useMutation({
    mutationKey: [MutationKeys.companyVerify],
    mutationFn: (email: string) => companyResendOTP(email),
    onSuccess: (data) => {
      logger.log(data);
      const message = data.data.message;
      toast.success(message);
    },
    onError: (err) => {
      logger.error(err);
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
                  mResendOTP(companyEmail);
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
  );
};

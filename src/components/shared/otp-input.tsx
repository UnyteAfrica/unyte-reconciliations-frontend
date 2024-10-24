import { logger } from "@/utils/logger";
import { PasswordInput } from "./input";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Loader } from "../loader";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/auth.context";
import { resendOTP } from "@/services/api/api-base";

type OTPInputProps = {
  otpVal: string;
  onChange: (otp: string) => void;
};

export const OTPInput: React.FC<OTPInputProps> = ({ otpVal, onChange }) => {
  const { email, isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) return <></>;

  const { mutate: mResendOTP, isPending: isResendLoading } = useMutation({
    mutationFn: () => resendOTP(email),
    onSuccess: (data) => {
      logger.log(data);
      toast.success("New OTP Sent");
    },
  });

  return (
    <div>
      <PasswordInput
        label="OTP"
        placeholder="******"
        value={otpVal}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="text-mPrimary text-sm font-semibold my-2"
        onClick={(e) => {
          e.preventDefault();
          mResendOTP();
        }}
        disabled={isResendLoading}
      >
        {isResendLoading ? <Loader className="mx-auto" /> : "Request OTP"}
      </button>
    </div>
  );
};

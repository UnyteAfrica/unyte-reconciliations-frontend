import { logger } from "@/utils/logger";
import { PasswordInput } from "./input";
import { ApiType } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { companyResendOTP } from "@/services/api/api-company";
import { agentResendOTP } from "@/services/api/api-agent";
import { useContext } from "react";
import { CompanyContext, CompanyContextType } from "@/context/company.context";
import { AgentContext, AgentContextType } from "@/context/agent.context";
import { Loader } from "../loader";
import toast from "react-hot-toast";

type OTPInputProps = {
  apiType: ApiType;
  otpVal: string;
  onChange: (otp: string) => void;
};

export const OTPInput: React.FC<OTPInputProps> = ({
  apiType,
  otpVal,
  onChange,
}) => {
  const { companyEmail, isLoggedIn: isCompanyLoggedIn } = useContext(
    CompanyContext
  ) as CompanyContextType;
  const { agentEmail, isLoggedIn: isAgentLoggedIn } = useContext(
    AgentContext
  ) as AgentContextType;

  if (!isCompanyLoggedIn && apiType == ApiType.Insurer) return <></>;
  if (!isAgentLoggedIn && apiType == ApiType.Agent) return <></>;

  const { mutate: mResendOTP, isPending: isResendLoading } = useMutation({
    mutationFn: () =>
      apiType == ApiType.Insurer
        ? companyResendOTP(companyEmail)
        : agentResendOTP(agentEmail),
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

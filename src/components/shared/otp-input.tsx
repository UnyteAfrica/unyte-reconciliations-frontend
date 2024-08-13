import { logger } from "@/utils/logger";
import { CustomInput } from "./input";
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
};

export const OTPInput: React.FC<OTPInputProps> = ({ apiType }) => {
  const { companyEmail, isLoggedIn: isCompanyLoggedIn } = useContext(
    CompanyContext
  ) as CompanyContextType;
  const { agentEmail, isLoggedIn: isAgentLoggedIn } = useContext(
    AgentContext
  ) as AgentContextType;

  logger.log(isCompanyLoggedIn);

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
      <CustomInput label="OTP" placeholder="******" />
      <button
        className="text-primary text-sm font-semibold my-2"
        onClick={() => mResendOTP()}
        disabled={isResendLoading}
      >
        {isResendLoading ? <Loader className="mx-auto" /> : "Request OTP"}
      </button>
    </div>
  );
};

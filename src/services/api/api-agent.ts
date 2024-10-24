import { AgentApiRoutes } from "./api-routes";
import { AgentSignupType } from "@/types/request.types";
import { axiosInstance } from "./api-base";

export const agentSignup = ({
  accountNo,
  agent_gampID,
  bvn,
  email,
  firstName,
  homeAddress,
  lastName,
  middleName,
  password,
  companyInviteCode,
}: AgentSignupType) => {
  return axiosInstance.post(
    AgentApiRoutes.signup,
    {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      home_address: homeAddress,
      email: email,
      bank_account: accountNo,
      bvn,
      agent_gampID,
      password,
    },
    {
      params: {
        invite: companyInviteCode,
      },
      headers: {
        Authorization: "",
      },
    }
  );
};

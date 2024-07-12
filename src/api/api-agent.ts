import axios from "axios";
import { AgentApiRoutes } from "./api-routes";
import {
  AgentLoginType,
  AgentPasswordResetType,
  AgentSignupType,
  AgentVerifyOTPType,
} from "@/types/request.types";

const URL =
  "https://unyte-reconciliation-backend-dev-ynoamqpukq-uc.a.run.app/api";

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: localStorage.getItem("agentAccessToken")
      ? `Bearer ${localStorage.getItem("agentAccessToken")}`
      : "",
  },
});

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
}: AgentSignupType) => {
  return axiosInstance.post(
    AgentApiRoutes.signup + "?invite=Incognito%2B9232%2Bunyte.com",
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
      headers: {
        Authorization: "",
      },
    }
  );
};

export const agentLogin = ({ emailOrGampID, password }: AgentLoginType) => {
  return axiosInstance.post(
    AgentApiRoutes.login,
    {
      email: emailOrGampID,
      password,
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

export const agentVerifyOTP = ({ email, otp }: AgentVerifyOTPType) => {
  return axiosInstance.post(
    AgentApiRoutes.verifyOTP,
    {
      email,
      otp,
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

export const agentResendOTP = (email: string) => {
  return axiosInstance.post(
    AgentApiRoutes.resendOTP,
    {
      email,
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

export const agentForgotPassword = (email: string) => {
  return axiosInstance.post(
    AgentApiRoutes.forgotPassword,
    {
      email,
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

export const agentResetPassword = ({
  idBase64,
  newPassword,
  token,
}: AgentPasswordResetType) => {
  return axiosInstance.post(
    AgentApiRoutes.resetPassword,
    {
      new_password: newPassword,
      confirm_password: newPassword,
      token,
      id_base64: idBase64,
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

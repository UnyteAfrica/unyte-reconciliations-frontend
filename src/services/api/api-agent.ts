import axios from "axios";
import { AGENT_UNPROTECTED_ROUTES, AgentApiRoutes } from "./api-routes";
import {
  AgentLoginType,
  AgentPasswordResetType,
  AgentSignupType,
  AgentVerifyOTPType,
} from "@/types/request.types";
import { LocalStorage } from "../local-storage";
import { jwtDecode } from "jwt-decode";
import { clearCredentials } from "@/utils/utils";
import { UserType } from "@/types/types";
import { logger } from "@/utils/logger";

const URL =
  "https://unyte-reconciliation-backend-dev-ynoamqpukq-uc.a.run.app/api";

const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // get both tokens from local storage
    let refreshToken = LocalStorage.getItem("agentRefreshToken") || "";
    let accessToken = LocalStorage.getItem("agentAccessToken") || "";

    if (AGENT_UNPROTECTED_ROUTES.includes(config.url ?? "")) return config;

    if (refreshToken && accessToken) {
      const decodedAccessToken = jwtDecode(accessToken as string);
      const decodedRefreshToken = jwtDecode(refreshToken as string);

      // if access token hasn't expired, just go ahead with the request
      if (new Date(Number(decodedAccessToken.exp + "000")) < new Date()) {
        // if refresh token has expired, clear tokens from local storage and log user out
        if (new Date(Number(decodedRefreshToken.exp + "000")) < new Date()) {
          clearCredentials(UserType.agent);
        } else {
          //otherwise get new access tokens
          try {
            let resp = await axios.post(URL + "/" + AgentApiRoutes.resetToken, {
              refresh_token: refreshToken,
            });

            LocalStorage.setItem("agentAccessToken", resp.data.access_token);
            LocalStorage.setItem("agentRefreshToken", resp.data.refresh_token);
          } catch (e: any) {
            clearCredentials(UserType.agent);

            logger.error(e.message);
          }
        }
      } else {
        accessToken = LocalStorage.getItem("agentAccessToken") || "";

        config.headers.Authorization = accessToken
          ? `Bearer ${accessToken}`
          : "";
      }
    }

    if (!accessToken) {
      clearCredentials(UserType.agent);
    }
    return config;
  },
  (err) => {
    return err;
  }
);

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

export const getAgentDetails = () => {
  return axiosInstance.get(AgentApiRoutes.details);
};

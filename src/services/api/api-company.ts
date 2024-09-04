import axios, { isAxiosError } from "axios";
import { COMPANY_UNPROTECTED_ROUTES, CompanyApiRoutes } from "./api-routes";
import {
  CompanyLoginType,
  CompanyPasswordResetType,
  CompanySignupType,
  CompanyVerifyOTPType,
  InviteAgentType,
} from "@/types/request.types";
import { jwtDecode } from "jwt-decode";
import { clearCredentials } from "@/utils/utils";
import { ApiCompanyAgent, ApiCompanyPolicy, UserType } from "@/types/types";
import { LocalStorage } from "../local-storage";
import { logger } from "@/utils/logger";

const URL =
  "https://unyte-reconciliation-backend-dev-ynoamqpukq-uc.a.run.app/api";

const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // get both tokens from local storage
    let refreshToken = LocalStorage.getItem("companyRefreshToken") || "";
    let accessToken = LocalStorage.getItem("companyAccessToken") || "";

    if (COMPANY_UNPROTECTED_ROUTES.includes(config.url ?? "")) return config;

    if (refreshToken && accessToken) {
      try {
        const decodedAccessToken = jwtDecode(accessToken as string);
        const decodedRefreshToken = jwtDecode(refreshToken as string);

        if (new Date(Number(decodedAccessToken.exp + "000")) < new Date()) {
          // if refresh token has expired, clear tokens from local storage and log user out
          if (new Date(Number(decodedRefreshToken.exp + "000")) < new Date()) {
            clearCredentials(UserType.company);
          } else {
            //otherwise get new access tokens

            let resp = await axios.post(
              URL + "/" + CompanyApiRoutes.resetToken,
              {
                refresh_token: refreshToken,
              }
            );

            LocalStorage.setItem("companyAccessToken", resp.data.access);
            // LocalStorage.setItem(
            //   "companyRefreshToken",
            //   resp.data.refresh_token
            // );
            config.headers.Authorization = `Bearer ${resp.data.access}`;
          }
        } else {
          accessToken = LocalStorage.getItem("companyAccessToken") || "";

          config.headers.Authorization = accessToken
            ? `Bearer ${accessToken}`
            : "";
        }
      } catch (e) {
        logger.error(e);
        if (isAxiosError(e)) logger.error(e.response);
        clearCredentials(UserType.company);
      }

      // if access token hasn't expired, just go ahead with the request
    }

    if (!accessToken) {
      clearCredentials(UserType.company);
    }
    return config;
  },
  (err) => {
    logger.error(err);
    return err;
  }
);

export const companySignup = ({
  admin_name,
  business_name,
  business_registration_number,
  email,
  gampId,
  password,
}: CompanySignupType) => {
  return axiosInstance.post(
    CompanyApiRoutes.signup,
    {
      admin_name,
      business_name,
      business_registration_number,
      email,
      insurer_gampID: gampId,
      password,
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

export const companyLogin = ({ email, password }: CompanyLoginType) => {
  return axiosInstance.post(
    CompanyApiRoutes.login,
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

export const companyVerifyOTP = ({ email, otp }: CompanyVerifyOTPType) => {
  return axiosInstance.post(
    CompanyApiRoutes.verifyOTP,
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

export const companyResendOTP = (email: string) => {
  return axiosInstance.post(
    CompanyApiRoutes.resendOTP,
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

export const companyForgotPassword = (email: string) => {
  return axiosInstance.post(
    CompanyApiRoutes.forgotPassword,
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

export const companyResetPassword = ({
  idBase64,
  newPassword,
  token,
}: CompanyPasswordResetType) => {
  return axiosInstance.post(
    CompanyApiRoutes.resetPassword,
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

export const getCompanyProfile = () => {
  return axiosInstance.get(CompanyApiRoutes.profile);
};

export const getCompanyDetails = () => {
  return axiosInstance.get(CompanyApiRoutes.details);
};

export const inviteAgent = (agents: InviteAgentType) => {
  return axiosInstance.post(CompanyApiRoutes.inviteAgent, {
    agents_list: agents,
  });
};

export const getAllAgents = () => {
  return axiosInstance.get<ApiCompanyAgent[]>(CompanyApiRoutes.getAllAgents);
};

export const updateCompanyProfilePicture = (data: FormData) => {
  return axiosInstance.post(CompanyApiRoutes.updateProfilePicture, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPolicies = () => {
  return axiosInstance.get<ApiCompanyPolicy[]>(CompanyApiRoutes.getPolicies);
};

import axios, { isAxiosError } from "axios";
import { LocalStorage } from "../local-storage";
import { AuthApiRoutes, UNPROTECTED_ROUTES } from "./api-routes";
import { jwtDecode } from "jwt-decode";
import { clearCredentials } from "@/utils/utils";
import { logger } from "@/utils/logger";
import {
  LoginType,
  PasswordResetType,
  VerifyOTPType,
} from "@/types/request.types";

const URL =
  "https://unyte-reconciliation-backend-dev-ynoamqpukq-uc.a.run.app/api";

export const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // get both tokens from local storage
    let refreshToken = LocalStorage.getItem("refreshToken") || "";
    let accessToken = LocalStorage.getItem("accessToken") || "";

    if (UNPROTECTED_ROUTES.includes(config.url ?? "")) return config;

    if (refreshToken && accessToken) {
      try {
        const decodedAccessToken = jwtDecode(accessToken as string);
        const decodedRefreshToken = jwtDecode(refreshToken as string);

        if (new Date(Number(decodedAccessToken.exp + "000")) < new Date()) {
          // if refresh token has expired, clear tokens from local storage and log user out
          if (new Date(Number(decodedRefreshToken.exp + "000")) < new Date()) {
            clearCredentials();
          } else {
            //otherwise get new access tokens

            let resp = await axios.post(URL + "/" + AuthApiRoutes.resetToken, {
              refresh_token: refreshToken,
            });

            LocalStorage.setItem("accessToken", resp.data.access);
            // LocalStorage.setItem(
            //   "companyRefreshToken",
            //   resp.data.refresh_token
            // );
            config.headers.Authorization = `Bearer ${resp.data.access}`;
          }
        } else {
          accessToken = LocalStorage.getItem("accessToken") || "";

          config.headers.Authorization = accessToken
            ? `Bearer ${accessToken}`
            : "";
        }
      } catch (e) {
        logger.error(e);
        if (isAxiosError(e)) logger.error(e.response);
        clearCredentials();
      }

      // if access token hasn't expired, just go ahead with the request
    }

    if (!accessToken) {
      clearCredentials();
    }
    return config;
  },
  (err) => {
    logger.error(err);
    return err;
  }
);

export const login = ({ email, password }: LoginType) => {
  return axiosInstance.post(
    AuthApiRoutes.login,
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

export const verifyOTP = ({ email, otp }: VerifyOTPType) => {
  return axiosInstance.post(
    AuthApiRoutes.verifyOTP,
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

export const resendOTP = (email: string) => {
  return axiosInstance.post(
    AuthApiRoutes.resendOTP,
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

export const forgotPassword = (email: string) => {
  return axiosInstance.post(
    AuthApiRoutes.forgotPassword,
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

export const resetPassword = ({
  idBase64,
  newPassword,
  token,
}: PasswordResetType) => {
  return axiosInstance.post(
    AuthApiRoutes.resetPassword,
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

export const getProfile = () => {
  return axiosInstance.get(AuthApiRoutes.profile);
};

export const getDetails = () => {
  return axiosInstance.get(AuthApiRoutes.details);
};

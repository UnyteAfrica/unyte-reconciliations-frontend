import axios from "axios";
import { CompanyApiRoutes } from "./api-routes";
import {
  CompanyLoginType,
  CompanyPasswordResetType,
  CompanySignupType,
  CompanyVerifyOTPType,
} from "@/types/request.types";

const URL =
  "https://unyte-reconciliation-backend-dev-ynoamqpukq-uc.a.run.app/api";

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `${
      localStorage.getItem("companyAccessToken")
        ? `Bearer ${localStorage.getItem("companyAccessToken")}`
        : ""
    }`,
  },
});

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

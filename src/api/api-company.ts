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

export const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: localStorage.getItem("accessToken")
      ? `Bearer ${localStorage.getItem("accessToken")}`
      : "",
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
  return axiosInstance.post(CompanyApiRoutes.signup, {
    admin_name,
    business_name,
    business_registration_number,
    email,
    insurer_gampID: gampId,
    password,
  });
};

export const companyLogin = ({ email, password }: CompanyLoginType) => {
  return axiosInstance.post(CompanyApiRoutes.login, {
    email,
    password,
  });
};

export const companyVerifyOTP = ({ email, otp }: CompanyVerifyOTPType) => {
  return axiosInstance.post(CompanyApiRoutes.verifyOTP, {
    email,
    otp,
  });
};

export const companyResendOTP = (email: string) => {
  return axiosInstance.post(CompanyApiRoutes.resendOTP, {
    email,
  });
};

export const companyForgotPassword = (email: string) => {
  return axiosInstance.post(CompanyApiRoutes.forgotPassword, {
    email,
  });
};

export const companyResetPassword = ({
  idBase64,
  newPassword,
  token,
}: CompanyPasswordResetType) => {
  return axiosInstance.post(CompanyApiRoutes.resetPassword, {
    new_password: newPassword,
    confirm_password: newPassword,
    token,
    id_base64: idBase64,
  });
};

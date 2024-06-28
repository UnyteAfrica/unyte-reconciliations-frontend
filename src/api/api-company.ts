import { SignupType } from "@/types/api-types";
import axios from "axios";
import { CompanyApiRoutes } from "./api-routes";

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
}: SignupType) => {
  return axiosInstance.post(CompanyApiRoutes.companySignup, {
    admin_name,
    business_name,
    business_registration_number,
    email,
    gampID: gampId,
    password,
  });
};

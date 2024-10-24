import { CompanyApiRoutes } from "./api-routes";
import { CompanySignupType, InviteAgentType } from "@/types/request.types";
import {
  ApiCompanyAgent,
  DateRangePolicy,
  PaginationWrapper,
  Policy,
} from "@/types/types";
import { Moment } from "moment";
import { axiosInstance } from "./api-base";

export const companySignup = ({
  admin_name,
  business_name,
  business_registration_number,
  email,
  password,
}: CompanySignupType) => {
  return axiosInstance.post(
    CompanyApiRoutes.signup,
    {
      admin_name,
      business_name,
      business_registration_number,
      email,
      password,
      insurer_gamp_id: "",
    },
    {
      headers: {
        Authorization: "",
      },
    }
  );
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

export const inviteAgentsThroughCSV = (data: FormData) => {
  return axiosInstance.post(CompanyApiRoutes.inviteAgentsThroughCSV, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPolicies = (page?: number) => {
  return axiosInstance.get<PaginationWrapper<Policy>>(
    CompanyApiRoutes.getPolicies(page || 1)
  );
};

export const getDateRangePolicies = (startDate: Moment, endDate: Moment) =>
  axiosInstance.get<DateRangePolicy[]>(
    CompanyApiRoutes.getDateRangePolicies(
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD")
    )
  );

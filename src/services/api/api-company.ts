import { CompanyApiRoutes, CompanyDashboardApiRoutes } from "./api-routes";
import { CompanySignupType, InviteAgentType } from "@/types/request.types";
import {
  ApiCompanyAgent,
  BasePolicy,
  DateRangePolicy,
  PaginationWrapper,
} from "@/types/types";
import { Moment } from "moment";
import { axiosInstance } from "./api-base";

export class CompanyApi {
  constructor() {}

  companySignup = ({
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

  inviteAgent = (agents: InviteAgentType) => {
    return axiosInstance.post(CompanyApiRoutes.inviteAgent, {
      agents_list: agents,
    });
  };

  getAllAgents = () => {
    return axiosInstance.get<ApiCompanyAgent[]>(CompanyApiRoutes.getAllAgents);
  };

  updateCompanyProfilePicture = (data: FormData) => {
    return axiosInstance.post(CompanyApiRoutes.updateProfilePicture, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  inviteAgentsThroughCSV = (data: FormData) => {
    return axiosInstance.post(CompanyApiRoutes.inviteAgentsThroughCSV, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  getPolicies = (page?: number) => {
    return axiosInstance.get<PaginationWrapper<BasePolicy>>(
      CompanyDashboardApiRoutes.policies("insurerId", page)
    );
  };

  getDateRangePolicies = (startDate: Moment, endDate: Moment) =>
    axiosInstance.get<DateRangePolicy[]>(
      CompanyApiRoutes.getDateRangePolicies(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD")
      )
    );
}

export const companyApi = new CompanyApi();

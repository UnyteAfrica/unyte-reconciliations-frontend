import { CompanyApiRoutes, CompanyDashboardApiRoutes } from "./api-routes";
import { CompanySignupType, InviteAgentType } from "@/types/request.types";
import {
  ApiCompanyAgent,
  BaseClaim,
  BasePolicy,
  DateRangePolicy,
  Product,
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

  getPolicies: (
    page?: number
  ) => Promise<{ policies: BasePolicy[]; total: number }> = async (page) => {
    const res = await axiosInstance.get(
      CompanyDashboardApiRoutes.policies(page)
    );
    const policies: BasePolicy[] = res.data.results.map(
      (data: any) =>
        ({
          date: data.effective_from,
          policyCategory: data.policy_type + " Policy",
          policyNo: data.policy_id,
          premium: Number(data.premium),
          affiliate: {
            id: data.merchant || data.agent,
            name: data.merchant || data.agent || "",
            type: !!data.agent ? "Agent" : "Merchant",
          },
        } as BasePolicy)
    );
    return { policies, total: res.data.count };
  };

  getProducts: (
    page?: number
  ) => Promise<{ products: Product[]; total: number }> = async (page) => {
    const res = await axiosInstance.get(
      CompanyDashboardApiRoutes.products(page)
    );
    const products: Product[] = res.data.map(
      (data: any) =>
        ({
          id: data.id,
          productCategory: data.product_type + " Policy",
          name: data.name,
          premium: Number(data.base_premium),
          description: data.description,
        } as Product)
    );
    return { products, total: res.data.length };
  };

  getClaims: (page?: number) => Promise<BaseClaim[]> = async (page) => {
    const res = await axiosInstance.get(CompanyDashboardApiRoutes.claims(page));
    const claims: BaseClaim[] = res.data;
    return claims;
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

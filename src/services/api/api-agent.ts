import { AgentApiRoutes } from "./api-routes";
import { AgentSignupType } from "@/types/request.types";
import { axiosInstance } from "./api-base";
import { BasePolicy, Product, QuoteFormValue } from "@/types/types";
import { objectToQuoteFormValues } from "@/utils/utils";

export class AgentApi {
  constructor() {}

  agentSignup = ({
    accountNo,
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

  getProducts: (
    page?: number
  ) => Promise<{ products: Product[]; total: number }> = async (page) => {
    const res = await axiosInstance.get(AgentApiRoutes.products(page));
    const products: Product[] = res.data.map(
      (data: any) =>
        ({
          id: data.id,
          productCategory: data.product_type + " Policy",
          name: data.name,
          premium: Number(data.base_premium),
          description: data.description,
          insurer: {
            id: data.provider.provider_id,
            name: data.provider.provider_name,
          },
        } as Product)
    );
    return { products, total: res.data.length };
  };

  getPolicies: (
    page?: number
  ) => Promise<{ policies: BasePolicy[]; total: number }> = async (page) => {
    const res = await axiosInstance.get(AgentApiRoutes.policies(page));
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
            type: !!data.agent ? "Agent" : "Agent",
          },
        } as BasePolicy)
    );
    return { policies, total: res.data.count };
  };

  static getQuoteParams = async (
    policyCategory: string
  ): Promise<{
    customer_metadata: QuoteFormValue[];
    insurance_details: QuoteFormValue[];
  }> => {
    const res = await axiosInstance.get(
      AgentApiRoutes.quoteParams(policyCategory)
    );
    const customer_metadata = objectToQuoteFormValues(
      res.data.customer_metadata
    );
    const insurance_details = objectToQuoteFormValues(
      res.data.insurance_details
    );

    return {
      customer_metadata,
      insurance_details,
    };
  };
}

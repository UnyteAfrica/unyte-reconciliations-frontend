import { MerchantApiRoutes, MerchantDashboardApiRoutes } from "./api-routes";
import { MerchantSignupType } from "@/types/request.types";

import { axiosInstance } from "./api-base";
import { MerchantProduct, MerchantSoldPolicy } from "@/types/types";

export class MerchantApi {
  constructor() {}

  merchantSignup = ({
    merchantEmail,
    merchantName,
    shortCode,
    password,
  }: MerchantSignupType) => {
    return axiosInstance.post(
      MerchantApiRoutes.signup,
      {
        name: merchantName,
        short_code: shortCode,
        email_address: merchantEmail,

        password,
      },
      {
        headers: {
          Authorization: "",
        },
      }
    );
  };

  getProducts: (
    page?: number
  ) => Promise<{ products: MerchantProduct[]; total: number }> = async (
    page
  ) => {
    const res = await axiosInstance.get(
      MerchantDashboardApiRoutes.products(page)
    );
    const products: MerchantProduct[] = res.data.map(
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
        } as MerchantProduct)
    );
    return { products, total: res.data.length };
  };

  getPolicies: (
    page?: number
  ) => Promise<{ policies: MerchantSoldPolicy[]; total: number }> = async (
    page
  ) => {
    const res = await axiosInstance.get(
      MerchantDashboardApiRoutes.policies(page)
    );
    const policies: MerchantSoldPolicy[] = res.data.results.map(
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
        } as MerchantSoldPolicy)
    );
    return { policies, total: res.data.count };
  };
}

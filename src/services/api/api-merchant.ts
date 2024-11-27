import { MerchantApiRoutes } from "./api-routes";
import { MerchantSignupType } from "@/types/request.types";

import { axiosInstance } from "./api-base";

export const merchantSignup = ({
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

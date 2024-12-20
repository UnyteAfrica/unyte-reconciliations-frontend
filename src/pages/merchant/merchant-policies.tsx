import { Route, Routes } from "react-router-dom";
import { BrowserRoutes } from "@/utils/routes";

import { MerchantProducts } from "@/components/merchant/merchant-products";
import { MerchantSoldPolicies } from "@/components/merchant/sold-policies";

// type UrlLink = {
//   text: string;
//   url: string;
// };

// const links: UrlLink[] = [
//   {
//     text: "Insurer Policies",
//     url: BrowserComboRoutes.merchantInsurerPolicies,
//   },
//   {
//     text: "Sold Policies",
//     url: BrowserComboRoutes.merchantSoldPolicies,
//   },
// ];

export const MerchantPolicies = () => {
  return (
    <div>
      {/* {!isMediaQueryMatched && (
        <div className="flex flex-row px-5 pb-6 border-[#333] space-x-4 mx-auto">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.url}
              className={({ isActive }) =>
                cx(
                  "font-medium duration-300",
                  isActive &&
                    "text-[#25D366] underline underline-offset-[10px] decoration-2",
                  !isActive && "text-[#333333]"
                )
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      )}
      {isMediaQueryMatched && (
        <div className="flex flex-row space-x-8 pb-[7px] mx-auto max-w-6xl mb-4 mt-10 border-b border-[#E0E0E0]">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.url}
              className={({ isActive }) =>
                cx(
                  "font-medium text-lg duration-300",
                  isActive &&
                    "text-[#25D366] underline underline-offset-[15px] decoration-2",
                  !isActive && "text-[#333333]"
                )
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      )} */}

      <div>
        <Routes>
          <Route
            path={BrowserRoutes.insurer.substring(1)}
            element={<MerchantProducts />}
          />
          <Route
            path={BrowserRoutes.sold.substring(1)}
            element={<MerchantSoldPolicies />}
          />
        </Routes>
      </div>
    </div>
  );
};

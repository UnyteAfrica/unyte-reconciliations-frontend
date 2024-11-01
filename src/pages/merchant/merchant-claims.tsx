import { NavLink, Route, Routes } from "react-router-dom";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import { cx } from "class-variance-authority";
import { useMediaQuery } from "@/utils/hooks";
import { MerchantPendingClaims } from "@/components/merchant/pending-claims";
import { MerchantCompletedClaims } from "@/components/merchant/completed-claims";

type UrlLink = {
  text: string;
  url: string;
};

const links: UrlLink[] = [
  {
    text: "Pending Claims",
    url: BrowserComboRoutes.pendingMerchantClaims,
  },
  {
    text: "Completed Claims",
    url: BrowserComboRoutes.completedMerchantClaims,
  },
];

export const MerchantClaims = () => {
  const { isMediaQueryMatched } = useMediaQuery(1024);
  return (
    <div>
      {!isMediaQueryMatched && (
        <div className="flex flex-row px-5 py-6 my-4 border-[#333] space-x-4 mx-auto">
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
        <div className="flex flex-row space-x-8 my-4 pb-[7px] mx-auto max-w-6xl">
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
      )}

      <div>
        <Routes>
          <Route
            path={BrowserRoutes.pending.substring(1)}
            element={<MerchantPendingClaims />}
          />
          <Route
            path={BrowserRoutes.completed.substring(1)}
            element={<MerchantCompletedClaims />}
          />
        </Routes>
      </div>
    </div>
  );
};

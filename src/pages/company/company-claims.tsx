import { NavLink, Route, Routes } from "react-router-dom";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import { cx } from "class-variance-authority";
import { PendingClaims } from "../../components/company/pending-claims";
import { CompletedClaims } from "../../components/company/completed-claims";
import { useMediaQuery } from "@/utils/hooks";

type UrlLink = {
  text: string;
  url: string;
};

const links: UrlLink[] = [
  {
    text: "Pending Claims",
    url: BrowserComboRoutes.pendingCompanyClaims,
  },
  {
    text: "Completed Claims",
    url: BrowserComboRoutes.completedCompanyClaims,
  },
];

export const CompanyClaims = () => {
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
        <div className="flex flex-row space-x-8 my-10 pb-[7px] mx-auto max-w-6xl px-6 mt-12 mb-16">
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
            element={<PendingClaims />}
          />
          <Route
            path={BrowserRoutes.completed.substring(1)}
            element={<CompletedClaims />}
          />
        </Routes>
      </div>
    </div>
  );
};

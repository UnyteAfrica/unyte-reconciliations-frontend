import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

import { Icon } from "../shared/icon";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clearCredentials } from "@/utils/utils";
import { UserType } from "@/types/types";
import { AgentContext } from "@/context/agent.context";
import { getAgentDetails } from "@/services/api/api-agent";
import { AgentQueryKeys } from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../loader";

type UrlLink = {
  text: string;
  url: string;
};

const navLinks: UrlLink[] = [
  {
    text: "Overview",
    url: BrowserComboRoutes.agentDashboard + BrowserRoutes.overview,
  },
  {
    text: "Policies",
    url: BrowserComboRoutes.agentDashboard + BrowserRoutes.policies,
  },
  {
    text: "Commissions",
    url: BrowserComboRoutes.agentDashboard + BrowserRoutes.commissions,
  },
  {
    text: "Devices",
    url: BrowserComboRoutes.agentDashboard + BrowserRoutes.devices,
  },
];

export const AgentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { setIsLoggedIn } = useContext(AgentContext);

  const { data: agentDetailsData, isPending: isAgentDetailsLoading } = useQuery(
    {
      queryKey: [AgentQueryKeys.details],
      queryFn: () => getAgentDetails(),
    }
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = (firstName: string, lastName: string) =>
    firstName.substring(0, 1).toUpperCase() +
    lastName.substring(0, 1).toUpperCase();

  const agentDetails = agentDetailsData?.data;

  return (
    <>
      <div
        id="navbar-container"
        className="flex justify-between items-center p-4 mx-12"
      >
        <div>
          <Icon className="shrink-0" type="logo" alt="unyte logo" />
        </div>
        <div className="space-x-24">
          {navLinks.map((navLink, idx) => (
            <NavLink
              key={idx}
              to={navLink.url}
              className={({ isActive }) =>
                cx(
                  "font-semibold text-lg duration-300",
                  (isActive ||
                    location.pathname.includes(navLink.text.toLowerCase())) &&
                    "text-[#25D366] underline underline-offset-[30px] decoration-4"
                )
              }
            >
              {navLink.text}
            </NavLink>
          ))}
        </div>

        {isAgentDetailsLoading ? (
          <Loader />
        ) : (
          !!agentDetails && (
            <div id="profile">
              <div className="relative">
                <button
                  className="px-4 py-2 text-[#333333] rounded-md"
                  onClick={toggleDropdown}
                >
                  <div className="space-x-2 flex flex-row items-center">
                    <div className="rounded-full h-10 w-10 p-2 bg-gray-200 text-base flex items-center justify-center">
                      {getInitials(
                        agentDetails.first_name,
                        agentDetails.last_name
                      )}
                    </div>
                    <span className="text-lg font-semibold max-xl:hidden">
                      {agentDetails.first_name + " " + agentDetails.last_name}
                    </span>{" "}
                    <BiChevronDown
                      className={cx(
                        "transition-all duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                </button>
                <div
                  className={twMerge(
                    "absolute w-full top-[65px] right-0 mt-2 py-2 z-10 border border-[#e1e1e1] bg-white shadow-lg rounded-lg max-h-0 transition-all duration-300 overflow-hidden opacity-0",
                    isOpen && "max-h-[240px] opacity-100"
                  )}
                >
                  <div className="px-6 py-4 flex items-center p-2">
                    <div className="rounded-full h-10 w-10 p-2 bg-gray-200 text-base flex items-center justify-center mr-2">
                      {getInitials(
                        agentDetails.first_name,
                        agentDetails.last_name
                      )}
                    </div>
                    <span className="text-base text-[#333] font-medium">
                      {agentDetails.first_name + " " + agentDetails.last_name}
                    </span>
                  </div>
                  <hr />
                  <NavLink
                    to={
                      BrowserComboRoutes.agentDashboard + BrowserRoutes.profile
                    }
                    className="block px-6 py-4 text-[#333] font-medium"
                  >
                    Profile
                  </NavLink>
                  <hr />
                  <button
                    className="block px-6 py-4 text-[#EB5757] font-medium"
                    onClick={() => {
                      clearCredentials(UserType.agent);
                      setIsLoggedIn(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <hr />
    </>
  );
};

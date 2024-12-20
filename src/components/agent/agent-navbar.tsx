import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

import { Icon } from "../shared/icon";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clearCredentials, getInitials } from "@/utils/utils";
import { AgentQueryKeys } from "@/utils/query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "../loader";
import { LuMenu } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "@/utils/hooks";
import { getDetails } from "@/services/api/api-base";
import { AuthContext } from "@/context/auth.context";

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
    text: "Customers",
    url: BrowserComboRoutes.agentDashboard + BrowserRoutes.customers,
  },
];

export const AgentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setIsLoggedIn, setEmail } = useContext(AuthContext);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const queryClient = useQueryClient();

  const { data: agentDetailsData, isPending: isAgentDetailsLoading } = useQuery(
    {
      queryKey: [AgentQueryKeys.details],
      queryFn: () => getDetails(),
    }
  );

  const logout = () => {
    clearCredentials();
    setIsLoggedIn(false);
    queryClient.removeQueries();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const agentDetails = agentDetailsData?.data;
  useEffect(() => {
    if (agentDetails) setEmail(agentDetails.email);
  }, [agentDetails]);

  const { isMediaQueryMatched } = useMediaQuery(1024);

  const requiresGreyBackground =
    location.pathname ==
      BrowserComboRoutes.agentDashboard + BrowserRoutes.policies ||
    location.pathname ==
      BrowserComboRoutes.agentDashboard + BrowserRoutes.customers;

  return (
    <>
      {!isMediaQueryMatched && (
        <div
          className={twMerge(
            "relative z-30",
            requiresGreyBackground && "bg-[#F8F8F8]"
          )}
        >
          <header className="px-5 pt-10 pb-4">
            <LuMenu
              onClick={() => setIsMobileMenuOpen(true)}
              size={32}
              className="block"
            />
          </header>
          <div
            className={twMerge(
              "fixed top-0 left-0 flex w-full transition duration-300 -translate-x-[100%]",
              isMobileMenuOpen && "translate-x-0"
            )}
          >
            <nav className="h-dvh bg-white w-[300px] relative px-5 py-10 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <Icon type="logo" className="block" />
                <AiOutlineClose
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="right-5 w-6 h-6"
                />
              </div>
              <div className="flex flex-col space-y-8">
                {navLinks.map((navLink, idx) => (
                  <NavLink
                    key={idx}
                    to={navLink.url}
                    className={({ isActive }) =>
                      cx(
                        "font-semibold text-lg duration-300",
                        isActive &&
                          "text-[#25D366] underline underline-offset-[10px] decoration-4"
                      )
                    }
                  >
                    {navLink.text}
                  </NavLink>
                ))}
              </div>
              <div>
                {isAgentDetailsLoading ? (
                  <Loader />
                ) : (
                  !!agentDetails && (
                    <Link
                      to={
                        BrowserComboRoutes.agentDashboard +
                        BrowserRoutes.profile
                      }
                      id="profile"
                    >
                      <div className="flex items-center mb-6">
                        <div className="rounded-full h-10 w-10 bg-gray-200 text-base flex items-center justify-center mr-2">
                          {getInitials(
                            agentDetails.first_name ?? "",
                            agentDetails.last_name ?? ""
                          )}
                        </div>
                        <div className="text-base text-[#333] font-medium">
                          {(agentDetails.first_name ?? "") +
                            " " +
                            (agentDetails.last_name ?? "")}
                        </div>
                      </div>

                      <button
                        className="block text-[#EB5757] font-medium"
                        onClick={logout}
                      >
                        Sign out
                      </button>
                    </Link>
                  )
                )}
              </div>
            </nav>
            <div
              className="grow bg-black/20 h-dvh"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}
      {isMediaQueryMatched && (
        <>
          <div
            id="navbar-container"
            className="flex justify-between items-center p-6 mx-auto max-w-6xl"
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
                        location.pathname.includes(
                          navLink.text.toLowerCase()
                        )) &&
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
                            agentDetails.first_name ?? "",
                            agentDetails.last_name ?? ""
                          )}
                        </div>
                        <span className="text-lg font-semibold hidden min-[1200px]:inline">
                          {(agentDetails.first_name ?? "") +
                            " " +
                            (agentDetails.last_name ?? "")}
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
                        "absolute w-[220px] top-[65px] right-0 mt-2 py-2 z-10 border border-[#e1e1e1] bg-white shadow-lg rounded-lg max-h-0 transition-all duration-300 overflow-hidden opacity-0",
                        isOpen && "max-h-[240px] opacity-100"
                      )}
                    >
                      <div className="px-6 py-4 flex items-center p-2">
                        <div className="rounded-full h-10 w-10 p-2 bg-gray-200 text-base flex items-center justify-center mr-2 font-bold">
                          {getInitials(
                            agentDetails.first_name ?? "",
                            agentDetails.last_name ?? ""
                          )}
                        </div>
                        <div className="text-base text-[#333] font-medium">
                          {(agentDetails.first_name ?? "") +
                            " " +
                            (agentDetails.last_name ?? "")}
                        </div>
                      </div>
                      <hr />
                      <NavLink
                        to={
                          BrowserComboRoutes.agentDashboard +
                          BrowserRoutes.profile
                        }
                        className="block px-6 py-4 text-[#333] font-medium"
                      >
                        Profile
                      </NavLink>
                      <hr />
                      <button
                        className="block px-6 py-4 text-[#EB5757] font-medium"
                        onClick={logout}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

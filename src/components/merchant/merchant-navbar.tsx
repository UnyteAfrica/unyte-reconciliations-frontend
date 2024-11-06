import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { Icon } from "../shared/icon";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clearCredentials, getCompanyInitials } from "@/utils/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MerchantQueryKeys } from "@/utils/query-keys";
import { Loader } from "../loader";
import { useLockScroll, useMediaQuery } from "@/utils/hooks";
import { LuMenu } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { getProfile } from "@/services/api/api-base";
import { AuthContext } from "@/context/auth.context";

type UrlLink = {
  text: string;
  url: string;
};

const navLinks: UrlLink[] = [
  {
    text: "Overview",
    url: BrowserComboRoutes.merchantDashboard + BrowserRoutes.overview,
  },
  {
    text: "Policies",
    url: BrowserComboRoutes.merchantInsurerPolicies,
  },
  {
    text: "Claims",
    url: BrowserComboRoutes.pendingMerchantClaims,
  },
];

export const MerchantNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setIsLoggedIn, setEmail } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: merchantDetailsData, isPending: isMerchantDetailsLoading } =
    useQuery({
      queryKey: [MerchantQueryKeys.profile],
      queryFn: () => getProfile(),
    });

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const logout = () => {
    clearCredentials();
    setIsLoggedIn(false);
    queryClient.invalidateQueries();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const merchantDetails = merchantDetailsData?.data;

  useEffect(() => {
    if (merchantDetails) setEmail(merchantDetails.email);
  }, [merchantDetails]);

  const { isMediaQueryMatched } = useMediaQuery(1024);

  useLockScroll(isMobileMenuOpen);

  return (
    <>
      {!isMediaQueryMatched && (
        <div className="relative z-30">
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
                        (isActive ||
                          location.pathname.includes(
                            navLink.text.toLowerCase()
                          )) &&
                          "text-[#25D366] underline underline-offset-[10px] decoration-4"
                      )
                    }
                  >
                    {navLink.text}
                  </NavLink>
                ))}
              </div>
              <div>
                {isMerchantDetailsLoading ? (
                  <Loader />
                ) : (
                  !!merchantDetails && (
                    <div id="profile">
                      <div className="flex items-center mb-6">
                        {!!merchantDetails.profile_image ? (
                          <img
                            className="h-10 w-10 object-cover inline-block mr-2 rounded-full"
                            src={merchantDetails.profile_image}
                            alt=""
                          />
                        ) : (
                          <div className="rounded-full h-10 w-10 bg-gray-200 text-base flex items-center justify-center mr-2">
                            {getCompanyInitials(merchantDetails.business_name)}
                          </div>
                        )}

                        <div className="text-base text-[#333] font-medium">
                          {merchantDetails.business_name}
                        </div>
                      </div>

                      <button
                        className="block text-[#EB5757] font-medium"
                        onClick={logout}
                      >
                        Sign out
                      </button>
                    </div>
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
        <div
          id="navbar-container"
          className="flex justify-between items-center py-4 mx-auto h-[87px] max-w-6xl border-b border-[#EFEFEF]"
        >
          <div>
            <Icon className="shrink-0" type="logo" alt="unyte logo" />
          </div>
          <div className="space-x-24">
            {navLinks.map((navLink, idx) => {
              return (
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
                        "text-[#25D366] underline underline-offset-[35px] decoration-4"
                    )
                  }
                >
                  {navLink.text}
                </NavLink>
              );
            })}
          </div>

          {isMerchantDetailsLoading ? (
            <Loader />
          ) : (
            !!merchantDetails && (
              <div id="profile">
                <div className="relative flex items-center">
                  <a
                    href="mailto:tech@unyte.africa"
                    className="w-10 h-10 flex justify-center items-center rounded-full bg-[#F4F4F4]"
                  >
                    <Icon type="mail" className="w-4 h-4" />
                  </a>
                  <button
                    className="px-4 py-2 text-[#333333] rounded-md"
                    onClick={toggleDropdown}
                  >
                    <div className="space-x-2 flex flex-row items-center">
                      {!!merchantDetails.profile_image ? (
                        <img
                          className="rounded-full h-10 w-10 object-cover"
                          src={merchantDetails.profile_image}
                          alt=""
                        />
                      ) : (
                        <div className="rounded-full h-10 w-10 p-2 bg-gray-200 text-base flex items-center justify-center">
                          {getCompanyInitials(merchantDetails.business_name)}
                        </div>
                      )}
                      <span className="text-lg font-semibold hidden min-[1200px]:inline">
                        {merchantDetails.business_name}
                      </span>{" "}
                      <BiChevronDown
                        className={cx(
                          "transition-all duration-300 w-6 h-6",
                          isOpen && "rotate-180"
                        )}
                      />
                    </div>
                  </button>
                  <div
                    className={twMerge(
                      "absolute w-[200px] top-[65px] right-0 mt-2 py-2 z-10 border border-[#e1e1e1] bg-white shadow-lg rounded-lg max-h-0 transition-all duration-300 overflow-hidden opacity-0",
                      isOpen && "max-h-[240px] opacity-100"
                    )}
                  >
                    <div className="px-6 py-4 flex items-center p-2">
                      <span className="text-base text-[#333] font-medium">
                        {merchantDetails.business_name}
                      </span>
                    </div>
                    <hr />
                    <NavLink
                      to={
                        BrowserComboRoutes.merchantDashboard +
                        BrowserRoutes.profile
                      }
                      className="block px-6 py-4 text-[#333] font-medium"
                    >
                      Profile
                    </NavLink>
                    <hr />
                    <button
                      onClick={logout}
                      className="block px-6 py-4 text-[#EB5757] font-medium"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

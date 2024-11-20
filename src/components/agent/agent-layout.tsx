import { Outlet, useNavigate } from "react-router-dom";
import { AgentNavbar } from "./agent-navbar";
import { BrowserRoutes } from "@/utils/routes";
import { useContext, useEffect } from "react";
import { LocalStorage } from "@/services/local-storage";
import { AuthContext } from "@/context/auth.context";
import { UserType } from "@/types/types";
import { clearCredentials } from "@/utils/utils";

export const AgentLayout = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const listener = (e: CustomEvent) => {
    if (e.detail.key == "accessToken" && e.detail.value == null) {
      navigate(BrowserRoutes.login);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    window.addEventListener(LocalStorage.eventName, listener as EventListener);

    return () =>
      window.removeEventListener(
        LocalStorage.eventName,
        listener as EventListener
      );
  }, []);

  useEffect(() => {
    if (LocalStorage.getItem("userType") != UserType.AGENT) {
      clearCredentials();
      navigate(BrowserRoutes.login);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate(BrowserRoutes.login);
  }, [isLoggedIn]);

  return (
    <div>
      <AgentNavbar />
      <Outlet />
    </div>
  );
};

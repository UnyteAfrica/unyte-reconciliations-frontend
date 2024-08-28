import { Outlet, useNavigate } from "react-router-dom";
import { AgentNavbar } from "./agent-navbar";
import { BrowserComboRoutes } from "@/utils/routes";
import { useContext, useEffect } from "react";
import { LocalStorage } from "@/services/local-storage";
import { AgentContext } from "@/context/agent.context";

export const AgentLayout = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AgentContext);
  const navigate = useNavigate();

  const listener = (e: CustomEvent) => {
    if (e.detail.key == "agentAccessToken" && e.detail.value == null) {
      navigate(BrowserComboRoutes.agentLogin);
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
    if (!isLoggedIn) navigate(BrowserComboRoutes.agentLogin);
  }, [isLoggedIn]);

  return (
    <div>
      <AgentNavbar />
      <Outlet />
    </div>
  );
};

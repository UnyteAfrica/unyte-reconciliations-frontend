import { Outlet, useNavigate } from "react-router-dom";
import { AgentNavbar } from "./agent-navbar";
import { BrowserComboRoutes } from "@/utils/routes";
import { useEffect } from "react";
import { LocalStorage } from "@/services/local-storage";

export const AgentLayout = () => {
  const navigate = useNavigate();

  const listener = (e: CustomEvent) => {
    if (e.detail.key == "agentAccessToken" && e.detail.value == null) {
      navigate(BrowserComboRoutes.agentLogin);
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

  return (
    <div>
      <AgentNavbar />
      <Outlet />
    </div>
  );
};

import { Outlet } from "react-router-dom";
import { AgentNavbar } from "./agent-navbar";

export const AgentLayout = () => {
  return (
    <div>
      <AgentNavbar />
      <Outlet />
    </div>
  );
};

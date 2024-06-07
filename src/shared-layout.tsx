import { Outlet } from "react-router-dom";
import { NavBar } from "./components/agent/agent-navbar";

function SharedOutlet() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default SharedOutlet;

import { Outlet } from "react-router-dom";
import { NavBar } from "./components/navbar";

function SharedOutlet() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default SharedOutlet;

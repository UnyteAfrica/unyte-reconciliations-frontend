import { Outlet } from "react-router-dom";

import NavBar from "./Components/NavBar";

function SharedOutlet() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default SharedOutlet;

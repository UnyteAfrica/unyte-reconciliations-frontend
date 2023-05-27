import { Navlink } from "react-router-dom";

import UnyteLogo from "../assets/Icons/UnyteLogo.svg"

function NavBar() {
  return (
    <>
      <div
        id="navbar-container"
        className="flex justify-between items-center p-6 mx-12"
      >
        <div id="logo">
            <img src={UnyteLogo} alt="unyte logo" />
        </div>
        <div id="pages">
            <Navlink to="/">Overview</Navlink>
            <Navlink to="policies">Policies</Navlink>
            <Navlink to="claims">Claims</Navlink>
        </div>
        <div id="profile"></div>
      </div>
      <hr />
    </>
  );
}

export default NavBar;

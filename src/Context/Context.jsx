import { createContext, useState } from "react";
import PropTypes from "prop-types";

const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const [userData, setUserData] = useState({});
  return (
    <DashboardContext.Provider value={{ userData, setUserData }}>
      {children}
    </DashboardContext.Provider>
  );
}

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DashboardContext, DashboardProvider };

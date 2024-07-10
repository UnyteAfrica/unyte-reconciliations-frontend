import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from "react";

const defaultAgentData = {
  policies_sold: 0,
  partner: { name: "" },
};

type AgentDataType = typeof defaultAgentData;
export type AgentContextType = {
  agentEmail: string;
  agentData: AgentDataType;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setAgentData: Dispatch<SetStateAction<AgentDataType>>;
  setAgentEmail: Dispatch<SetStateAction<string>>;
};

export const AgentContext = createContext<AgentContextType>({
  agentData: defaultAgentData,
  agentEmail: "",
  isLoggedIn: false,
  setAgentEmail: () => {},
  setAgentData: () => {},
  setIsLoggedIn: () => {},
});

export const AgentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [agentData, setAgentData] = useState(defaultAgentData);
  const [agentEmail, setAgentEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AgentContext.Provider
      value={{
        agentData,
        agentEmail,
        setAgentEmail,
        setAgentData,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

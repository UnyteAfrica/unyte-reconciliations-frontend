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
  agentData: AgentDataType;
  setAgentData: Dispatch<SetStateAction<AgentDataType>>;
};

export const AgentContext = createContext<AgentContextType>({
  agentData: defaultAgentData,
  setAgentData: () => {},
});

export const AgentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [agentData, setAgentData] = useState(defaultAgentData);

  return (
    <AgentContext.Provider
      value={{
        agentData,
        setAgentData,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

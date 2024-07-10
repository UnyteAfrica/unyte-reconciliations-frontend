import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type OverlayContextType = {
  isNewAgentOverlayOpened: boolean;
  setNewAgentOverlayOpened: Dispatch<SetStateAction<boolean>>;
};

export const OverlayContext = createContext<OverlayContextType | null>({
  isNewAgentOverlayOpened: false,
  setNewAgentOverlayOpened: () => {},
});

export const OverlayContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isNewAgentOverlayOpened, setNewAgentOverlayOpened] = useState(false);

  return (
    <OverlayContext.Provider
      value={{
        isNewAgentOverlayOpened,
        setNewAgentOverlayOpened,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

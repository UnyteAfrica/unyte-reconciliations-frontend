import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type OverlayContextType = {
  isNewAgentOverlayOpened: boolean;
  isUpdateClaimStatusOpened: boolean;
  setIsUpdateClaimStatusOpened: Dispatch<SetStateAction<boolean>>;
  setNewAgentOverlayOpened: Dispatch<SetStateAction<boolean>>;
};

export const OverlayContext = createContext<OverlayContextType | null>({
  isNewAgentOverlayOpened: false,
  isUpdateClaimStatusOpened: false,
  setIsUpdateClaimStatusOpened: () => {},
  setNewAgentOverlayOpened: () => {},
});

export const OverlayContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isNewAgentOverlayOpened, setNewAgentOverlayOpened] = useState(false);
  const [isUpdateClaimStatusOpened, setIsUpdateClaimStatusOpened] =
    useState(false);

  return (
    <OverlayContext.Provider
      value={{
        isUpdateClaimStatusOpened,
        isNewAgentOverlayOpened,
        setIsUpdateClaimStatusOpened,
        setNewAgentOverlayOpened,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

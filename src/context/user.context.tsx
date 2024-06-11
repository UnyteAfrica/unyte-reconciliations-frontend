import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from "react";

const defaultUserData = {
  policies_sold: 0,
  partner: { name: "" },
};

type UserDataType = typeof defaultUserData;
export type UserContextType = {
  userData: UserDataType;
  setUserData: Dispatch<SetStateAction<UserDataType>>;
};

export const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  setUserData: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState(defaultUserData);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

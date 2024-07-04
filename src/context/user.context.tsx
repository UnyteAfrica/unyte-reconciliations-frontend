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
  userEmail: string;
  userData: UserDataType;
  setUserData: Dispatch<SetStateAction<UserDataType>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  userEmail: "",
  setUserEmail: () => {},
  setUserData: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState(defaultUserData);
  const [userEmail, setUserEmail] = useState("");

  return (
    <UserContext.Provider
      value={{ userData, userEmail, setUserEmail, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

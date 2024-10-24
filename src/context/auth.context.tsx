import { LocalStorage } from "@/services/local-storage";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from "react";

export type AuthContextType = {
  email: string;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType>({
  email: "",
  isLoggedIn: false,
  setEmail: () => {},
  setIsLoggedIn: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!LocalStorage.getItem("accessToken")
  );

  useEffect(() => {
    if (LocalStorage.getItem("accessToken")) setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

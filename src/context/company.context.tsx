import { LocalStorage } from "@/services/local-storage";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from "react";

const defaultCompanyData = {
  policies_sold: 0,
  partner: { name: "" },
};

type CompanyDataType = typeof defaultCompanyData;
export type CompanyContextType = {
  companyEmail: string;
  companyData: CompanyDataType;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setCompanyData: Dispatch<SetStateAction<CompanyDataType>>;
  setCompanyEmail: Dispatch<SetStateAction<string>>;
};

export const CompanyContext = createContext<CompanyContextType>({
  companyData: defaultCompanyData,
  companyEmail: "",
  isLoggedIn: false,
  setCompanyEmail: () => {},
  setCompanyData: () => {},
  setIsLoggedIn: () => {},
});

export const CompanyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [companyData, setCompanyData] = useState(defaultCompanyData);
  const [companyEmail, setCompanyEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!LocalStorage.getItem("companyAccessToken")
  );

  useEffect(() => {
    if (LocalStorage.getItem("companyAccessToken")) setIsLoggedIn(true);
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        companyData,
        companyEmail,
        setCompanyEmail,
        setCompanyData,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

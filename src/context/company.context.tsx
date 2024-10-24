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
  companyData: CompanyDataType;
  setCompanyData: Dispatch<SetStateAction<CompanyDataType>>;
};

export const CompanyContext = createContext<CompanyContextType>({
  companyData: defaultCompanyData,
  setCompanyData: () => {},
});

export const CompanyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [companyData, setCompanyData] = useState(defaultCompanyData);

  return (
    <CompanyContext.Provider
      value={{
        companyData,
        setCompanyData,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

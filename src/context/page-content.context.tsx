import { Filter } from "@/types/types";
import { createContext, PropsWithChildren, useState } from "react";

export type PageContentContextType = {
  filter: Filter;
  setFilter: (newFilter: Filter) => void;
};

export const defaultPageContent: PageContentContextType = {
  filter: {
    selectedPolicyCategories: {},
    startDate: new Date(),
    endDate: new Date(),
    searchText: "",
    minAmount: "0",
    maxAmount: "100000",
    active: false,
  },
  setFilter: (_: Filter) => {},
};

export const PageContentContext =
  createContext<PageContentContextType>(defaultPageContent);

export const PageContentContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [filter, setFilter] = useState<Filter>(defaultPageContent.filter);

  return (
    <PageContentContext.Provider value={{ filter, setFilter }}>
      {children}
    </PageContentContext.Provider>
  );
};

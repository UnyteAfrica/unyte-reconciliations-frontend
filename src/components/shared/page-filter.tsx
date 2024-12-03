import { cx } from "class-variance-authority";
import { WithLabel } from "./with-label";
import { CustomInput, DateInput } from "./input";
import { Filter, policyCategories } from "@/types/types";
import { getShortenedSelectionMapText, nairaSign } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";
import { useContext, useState } from "react";
import { PageContentContext } from "@/context/page-content.context";
import { CheckboxSelector } from "./checkbox-selector";

type PageFilterProps = {
  isFilterOpen: boolean;
  onClose: () => void;
  product: string;
  startDate: Date;
  endDate: Date;
  setProduct: (product: string) => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
  isMediaQueryMatched: boolean;
};

export const PageFilter: React.FC<PageFilterProps> = ({
  isFilterOpen,
  onClose,

  isMediaQueryMatched,
}) => {
  const { filter, setFilter } = useContext(PageContentContext);
  const [iFilter, setIFilter] = useState<Filter>(filter);
  const [isCheckboxSelectorMenuOpen, setIsCheckboxSelectorMenuOpen] =
    useState(false);
  const { endDate, maxAmount, minAmount, selectedPolicyCategories, startDate } =
    iFilter;

  const resetSelectedPolicyCategories = () => {
    setIFilter({
      ...iFilter,
      selectedPolicyCategories: {},
    });
  };

  const applyFilter = () => {
    setFilter(iFilter);
  };

  const selectedCategoriesText = getShortenedSelectionMapText(
    selectedPolicyCategories
  );

  if (isMediaQueryMatched)
    return (
      <div
        data-testid="filter"
        className={cx(
          "bg-white px-5 py-10 absolute top-[55px] w-[450px] right-0 rounded-lg border border-[#ccc] space-y-6 transition-all overflow-hidden opacity-0",
          !isFilterOpen && "max-h-0",
          isFilterOpen && "max-h-[600px] opacity-100 overflow-y-auto isOpened"
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsCheckboxSelectorMenuOpen(false);
        }}
      >
        <WithLabel label="Custom Date Range">
          <div className="flex w-full">
            <DateInput
              containerClassName="rounded-tr-none rounded-br-none font-semibold w-1/2"
              date={startDate}
              onDateChange={(date) =>
                setIFilter({ ...iFilter, startDate: date })
              }
            />
            <DateInput
              containerClassName="rounded-tl-none rounded-bl-none font-semibold w-1/2"
              date={endDate}
              onDateChange={(date) => setIFilter({ ...iFilter, endDate: date })}
            />
          </div>
        </WithLabel>

        <WithLabel label="Select Policy Category">
          <CheckboxSelector
            options={policyCategories}
            containerClassName="w-full"
            isCheckboxSelectorMenuOpen={isCheckboxSelectorMenuOpen}
            setIsCheckboxSelectorMenuOpen={setIsCheckboxSelectorMenuOpen}
            resetSelectedMap={resetSelectedPolicyCategories}
            value={selectedCategoriesText}
            selectionMap={selectedPolicyCategories}
            onChange={(val, isSelected) => {
              setIFilter({
                ...iFilter,
                selectedPolicyCategories: {
                  ...iFilter.selectedPolicyCategories,
                  [val]: isSelected,
                },
              });
            }}
          />
        </WithLabel>
        <WithLabel label="Amount Range">
          <div className="flex w-full">
            <CustomInput
              className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold rounded-r-none"
              type="number"
              placeholder={nairaSign}
              value={minAmount || ""}
              onChange={(e) =>
                setIFilter({
                  ...iFilter,
                  minAmount: e.target.value,
                })
              }
            />
            <CustomInput
              className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold rounded-l-none"
              type="number"
              placeholder={nairaSign}
              value={maxAmount}
              onChange={(e) =>
                setIFilter({
                  ...iFilter,
                  maxAmount: e.target.value,
                })
              }
            />
          </div>
        </WithLabel>

        <div className="flex ml-auto">
          <button
            className="bg-white border rounded-md w-[90px] inline-block mr-4 py-2 ml-auto"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-mPrimary text-white w-[115px] rounded-md py-2"
            onClick={() => {
              onClose();
              applyFilter();
            }}
          >
            Apply Filter
          </button>
        </div>
      </div>
    );

  return (
    <div
      data-testid="overlay"
      className={twMerge(
        "overlay h-dvh w-screen bg-black/30 fixed inset-0 transition z-50",
        isFilterOpen && "opacity-100 translate-y-0",
        !isFilterOpen && "opacity-0 translate-y-[100%]"
      )}
      onClick={onClose}
    >
      <div
        className={twMerge(
          "bg-white w-screen absolute bottom-0 rounded-t-2xl transition"
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="p-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-xl">Filter Commissions</h2>
            <button onClick={onClose}>
              <Icon type="close" className="w-6 h-6" />
            </button>
          </header>
          <div
            data-testid="filter"
            onClick={(e) => e.stopPropagation()}
            className={cx(
              "bg-white rounded-lg space-y-6 transition-all",
              isFilterOpen && "isOpened",
              !isFilterOpen && ""
            )}
          >
            <WithLabel
              className="flex justify-between items-center w-full"
              labelClassName="mb-0"
              label="Custom Date Range"
            >
              <div className="w-full inline-block max-w-[200px]">
                <DateInput
                  containerClassName="font-semibold w-full block mb-1"
                  date={startDate}
                  onDateChange={(date) =>
                    setIFilter({ ...iFilter, startDate: date })
                  }
                />
                <DateInput
                  containerClassName="font-semibold w-full"
                  date={endDate}
                  onDateChange={(date) =>
                    setIFilter({ ...iFilter, endDate: date })
                  }
                />
              </div>
            </WithLabel>

            <WithLabel
              className="flex justify-between items-center w-full"
              labelClassName="mb-0"
              label="Select Policy Category"
            >
              <CheckboxSelector
                options={policyCategories}
                containerClassName="w-full max-w-[200px]"
                isCheckboxSelectorMenuOpen={isCheckboxSelectorMenuOpen}
                setIsCheckboxSelectorMenuOpen={setIsCheckboxSelectorMenuOpen}
                resetSelectedMap={resetSelectedPolicyCategories}
                value={selectedCategoriesText}
                selectionMap={selectedPolicyCategories}
                onChange={(val, isSelected) => {
                  setIFilter({
                    ...iFilter,
                    selectedPolicyCategories: {
                      ...iFilter.selectedPolicyCategories,
                      [val]: isSelected,
                    },
                  });
                }}
              />
            </WithLabel>
            <WithLabel
              className="flex justify-between items-center w-full"
              labelClassName="mb-0"
              label="Amount Range"
            >
              <div className="w-full inline-block max-w-[200px]">
                <CustomInput
                  className="px-4 py-2 h-[42px] text-base text-center border-[#e5e7eb] font-semibold mb-1"
                  type="number"
                  placeholder={nairaSign}
                  value={minAmount || ""}
                  onChange={(e) =>
                    setIFilter({
                      ...iFilter,
                      minAmount: e.target.value,
                    })
                  }
                />
                <CustomInput
                  className="px-4 py-2 h-[42px] text-base text-center border-[#e5e7eb] font-semibold"
                  type="number"
                  placeholder={nairaSign}
                  value={maxAmount}
                  onChange={(e) =>
                    setIFilter({
                      ...iFilter,
                      maxAmount: e.target.value,
                    })
                  }
                />
              </div>
            </WithLabel>
            <button
              className="bg-mPrimary text-white w-full rounded-md py-2"
              onClick={() => {
                onClose();
                applyFilter();
              }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

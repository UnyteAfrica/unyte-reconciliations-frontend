import { ReactNode, useContext, useState } from "react";
import { Selector } from "./selector";
import { SearchBar } from "../searchbar";
import { BiChevronDown } from "react-icons/bi";
import { DownloadButton } from "../download-button";
import { cx } from "class-variance-authority";
import { WithLabel } from "./with-label";
import { CustomInput, DateInput } from "./input";
import { nairaSign } from "@/utils/utils";
import { Pagination } from "./pagination";
import { IoMdAdd } from "react-icons/io";
import { OverlayContext, OverlayContextType } from "@/context/overlay.context";
import { useMediaQuery } from "@/utils/hooks";
import { IoFilterOutline } from "react-icons/io5";
import { Loader } from "../loader";

export const PERIODS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
} as const;
const periods = Object.values(PERIODS);
export const products = [
  "Comprehensive",
  "Credit Life",
  "Card Protect",
  "Student",
  "Travel",
  "Device",
] as const;

type PageContentProps = {
  pageTable: ReactNode;
  title: string;
  searchbarPlaceholder?: string;
  hasNewAgent?: boolean;
  error?: Error | null;
  isLoading?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  pageCount?: number;
};

export const PageContent: React.FC<PageContentProps> = ({
  pageTable,
  title,
  searchbarPlaceholder,
  hasNewAgent = false,
  error,
  isLoading,
  onPageChange,
  page,
  pageCount,
  totalItems,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [period, setPeriod] = useState<string>(periods[0]);
  const [product, setProduct] = useState<string>(products[0]);
  const [startDate, setStartDate] = useState(new Date(1699885840400));
  const [endDate, setEndDate] = useState(new Date(1699885870400));

  const { setNewAgentOverlayOpened } = useContext(
    OverlayContext
  ) as OverlayContextType;

  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <>
      {!isMediaQueryMatched && (
        <div
          className="px-5 py-6 max-w-[850px] mx-auto"
          onClick={() => setIsFilterOpen(false)}
        >
          <header className="mb-7">
            <h1 className="font-semibold text-2xl mb-5">{title}</h1>
            <SearchBar
              placeholder={searchbarPlaceholder ?? "Find policy reference"}
              containerClassName="mb-4"
            />
            {/* <div className="flex w-full">
              <div className="border border-[#E0E0E0] p-4 rounded-lg flex flex-col grow rounded-r-none">
                <em className="not-italic text-xs text-[#828282] mb-1">
                  Total Commission
                </em>
                <em className="not-italic font-semibold text-[#333] mb-2">
                  {nairaSign}40,000.00
                </em>
                <em className="not-italic font-medium text-[10px] text-[#25D366]">
                  <AiOutlineRise className="inline-block mr-1" />
                  Up by 10%
                </em>
              </div>
              <div className="border border-[#E0E0E0] p-4 rounded-lg flex flex-col grow rounded-l-none">
                <em className="not-italic text-xs text-[#828282] mb-1">
                  Total Policies Sold
                </em>
                <em className="not-italic font-semibold text-[#333] mb-2">
                  50 Policies
                </em>
                <em className="not-italic font-medium text-[10px] text-[#25D366]">
                  <AiOutlineRise className="inline-block mr-1" />
                  Up by 10%
                </em>
              </div>
            </div> */}
          </header>
          <main className="">
            <div className="flex justify-between items-center relative">
              <h2 className="font-medium">Activity</h2>
              <button
                className="bg-[#25D366] rounded-full p-2 px-4 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen((isFilterOpen) => !isFilterOpen);
                }}
              >
                <IoFilterOutline className="inline-block mr-1" />
                Filter
              </button>
              <div
                data-testid="filter"
                onClick={(e) => e.stopPropagation()}
                className={cx(
                  "bg-white px-5 py-10 absolute top-[50px] w-[250px] right-0 rounded-lg border border-[#ccc] space-y-6 transition-all duration-[5000ms] overflow-hidden opacity-0 ",
                  !isFilterOpen && "max-h-0",
                  isFilterOpen && "max-h-[500px] opacity-100 overflow-y-auto"
                )}
              >
                <WithLabel label="Period Range">
                  <Selector
                    options={periods}
                    containerClassName="w-full"
                    value={period}
                    onChange={(val) => setPeriod(val)}
                  />
                </WithLabel>
                <WithLabel label="Custom Date Range">
                  <div className="w-full">
                    <DateInput
                      containerClassName="font-semibold w-full block"
                      date={startDate}
                      onDateChange={(date) => setStartDate(date)}
                    />
                    <DateInput
                      containerClassName="font-semibold w-full"
                      date={endDate}
                      onDateChange={(date) => setEndDate(date)}
                    />
                  </div>
                </WithLabel>
                <CustomInput
                  className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold"
                  label="Policy No."
                  labelClassName="text-base"
                  placeholder="#A023457"
                />
                <WithLabel label="Select Product(s)">
                  <Selector
                    options={products}
                    containerClassName="w-full"
                    value={product}
                    onChange={(val) => setProduct(val)}
                  />
                </WithLabel>
                <CustomInput
                  className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold"
                  label="Amount"
                  labelClassName="text-base"
                  placeholder={nairaSign}
                />
                <div className="flex ml-auto">
                  <button
                    className="bg-white border rounded-md w-[90px] inline-block mr-4 py-2 ml-auto"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-mPrimary text-white w-[115px] rounded-md py-2"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
            {isLoading ? (
              <Loader className="mx-auto w-16 h-16 mt-20" />
            ) : error ? (
              <p className="text-red-600 text-xl font-bold text-center mt-10">
                Something went wrong. Please try again
              </p>
            ) : (
              <>
                <div className="my-6">{pageTable}</div>
                <Pagination
                  currentPage={page || 1}
                  itemsCount={totalItems || 10}
                  pageSize={pageCount || 10}
                  onPageChange={onPageChange ? onPageChange : () => {}}
                />
              </>
            )}
          </main>
        </div>
      )}
      {isMediaQueryMatched && (
        <div
          className="mx-auto max-w-7xl mt-12 px-6 mb-16"
          onClick={() => setIsFilterOpen(false)}
        >
          <div className="flex flex-row justify-between items-center mb-10 relative">
            <span
              data-testid="pageTitle"
              className="text-3xl text-[#333333] font-semibold capitalize"
            >
              {title}
            </span>
            <SearchBar
              placeholder={searchbarPlaceholder ?? "Find policy reference"}
            />
            <div id="dates" className="flex flex-row items-center space-x-3">
              {hasNewAgent && (
                <button
                  className="text-[#333333]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewAgentOverlayOpened(true);
                  }}
                >
                  <div className="space-x-2 flex flex-row items-center bg-mPrimary px-4 py-2 rounded text-white">
                    <span className="text-base">Invite Agent</span>
                    <IoMdAdd />
                  </div>
                </button>
              )}

              <button
                className="text-[#333333]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen((isFilterOpen) => !isFilterOpen);
                }}
              >
                <div className="space-x-2 flex flex-row items-center bg-[#828282] px-4 py-2 rounded text-white">
                  <span className="text-base">Filter</span>
                  <BiChevronDown
                    className={cx(
                      "transition-all duration-300",
                      isFilterOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>
              <DownloadButton data={[]} />
            </div>
            <div
              data-testid="filter"
              className={cx(
                "bg-white px-5 py-10 absolute top-[55px] w-[450px] right-0 rounded-lg border border-[#ccc] space-y-6 transition-all overflow-hidden opacity-0",
                !isFilterOpen && "max-h-0",
                isFilterOpen && "max-h-[500px] opacity-100 overflow-y-auto"
              )}
            >
              <WithLabel label="Period Range">
                <Selector
                  options={periods}
                  containerClassName="w-full"
                  value={period}
                  onChange={(val) => setPeriod(val)}
                />
              </WithLabel>
              <WithLabel label="Custom Date Range">
                <div className="flex w-full">
                  <DateInput
                    containerClassName="rounded-tr-none rounded-br-none font-semibold w-1/2"
                    date={startDate}
                    onDateChange={(date) => setStartDate(date)}
                  />
                  <DateInput
                    containerClassName="rounded-tl-none rounded-bl-none font-semibold w-1/2"
                    date={endDate}
                    onDateChange={(date) => setEndDate(date)}
                  />
                </div>
              </WithLabel>
              <CustomInput
                className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold"
                label="Policy No."
                labelClassName="text-base"
                placeholder="#A023457"
              />
              <WithLabel label="Select Product(s)">
                <Selector
                  options={products}
                  containerClassName="w-full"
                  value={product}
                  onChange={(val) => setProduct(val)}
                />
              </WithLabel>
              <CustomInput
                className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold"
                label="Amount"
                labelClassName="text-base"
                placeholder={nairaSign}
              />
              <div className="flex ml-auto">
                <button
                  className="bg-white border rounded-md w-[90px] inline-block mr-4 py-2 ml-auto"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-mPrimary text-white w-[115px] rounded-md py-2"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loader className="mx-auto w-16 h-16 mt-20" />
          ) : error ? (
            <p className="text-red-600 text-xl font-bold text-center mt-10">
              Something went wrong. Please try again
            </p>
          ) : (
            <>
              <div className="mb-10">{pageTable}</div>
              <Pagination
                currentPage={page || 1}
                itemsCount={totalItems || 10}
                pageSize={pageCount || 10}
                onPageChange={onPageChange ? onPageChange : () => {}}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

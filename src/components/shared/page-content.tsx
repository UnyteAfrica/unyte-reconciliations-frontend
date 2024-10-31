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
import { AiOutlineRise } from "react-icons/ai";
import { Icon } from "./icon";
import { twMerge } from "tailwind-merge";

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
  const [searchText, setSearchText] = useState("");

  const { setNewAgentOverlayOpened } = useContext(
    OverlayContext
  ) as OverlayContextType;

  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <>
      {!isMediaQueryMatched && (
        <div
          className="px-5 pb-10 max-w-[850px] mx-auto"
          onClick={() => setIsFilterOpen(false)}
        >
          <header className="mb-8">
            <h1 className="font-semibold text-2xl mb-6">{title}</h1>
            <SearchBar
              placeholder={searchbarPlaceholder ?? "Find policy reference"}
              containerClassName="mb-6 border-2 border-[#E0E0E0] h-10"
              className="text-sm font-medium py-3"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="flex w-full">
              <div className="border border-[#E0E0E0] p-4 rounded-lg flex flex-col grow rounded-r-none">
                <em className="not-italic text-xs text-[#828282] mb-1">
                  Total Commission
                </em>
                <em className="not-italic font-semibold text-[#333] mb-2">
                  {nairaSign}40,000.00
                </em>
                <em className="not-italic font-medium text-[10px] text-[#25D366]">
                  <AiOutlineRise className="inline-block mr-1 w-3" />
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
                  <AiOutlineRise className="inline-block mr-1 w-3" />
                  Up by 10%
                </em>
              </div>
            </div>
          </header>
          <main className="">
            <div className="flex justify-between items-center relative">
              <h2 className="font-medium">Activity</h2>
              <button
                className="bg-[#25D366] rounded-full py-1 text-white text-xs w-[62px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen((isFilterOpen) => !isFilterOpen);
                }}
              >
                <IoFilterOutline className="inline-block mr-1" />
                Filter
              </button>
              <PageFilter
                isFilterOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                period={period}
                product={product}
                startDate={startDate}
                endDate={endDate}
                setPeriod={setPeriod}
                setProduct={setProduct}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
              />
            </div>
            {isLoading ? (
              <Loader className="mx-auto w-16 h-16 mt-20" />
            ) : error ? (
              <p className="text-red-600 text-xl font-bold text-center mt-10">
                Something went wrong. Please try again
              </p>
            ) : (
              <>
                <div className="my-4 mb-10">{pageTable}</div>
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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

type PageFilterProps = {
  isFilterOpen: boolean;
  onClose: () => void;
  period: string;
  product: string;
  startDate: Date;
  endDate: Date;
  setPeriod: (period: string) => void;
  setProduct: (product: string) => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
};

const PageFilter: React.FC<PageFilterProps> = ({
  isFilterOpen,
  onClose,
  period,
  setPeriod,
  product,
  setProduct,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div
      className={twMerge(
        "h-dvh w-screen bg-black/30 fixed inset-0 transition",
        isFilterOpen && "z-50 opacity-100 translate-y-0",
        !isFilterOpen && "-z-20 opacity-0 translate-y-[100%]"
      )}
      onClick={onClose}
    >
      <div
        className={twMerge(
          "bg-white w-screen absolute bottom-0 rounded-t-2xl transition"
          // isShowingBottomSheet && "translate-y-0"
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
              isFilterOpen && "isOpened"
            )}
          >
            <WithLabel
              className="flex justify-between items-center w-full"
              label="Period Range"
              labelClassName="mb-0"
            >
              <Selector
                options={periods}
                containerClassName="w-full inline-block max-w-[200px]"
                value={period}
                onChange={(val) => setPeriod(val)}
              />
            </WithLabel>
            <WithLabel
              className="flex justify-between items-center w-full"
              labelClassName="mb-0"
              label="Custom Date Range"
            >
              <div className="w-full inline-block max-w-[200px]">
                <DateInput
                  containerClassName="font-semibold w-full block mb-1"
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
            {/* <CustomInput
              className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold max-w-[200px]"
              label="Policy No."
              labelClassName="text-base"
              containerClassName="flex justify-between items-center w-full"
              placeholder="#A023457"
            /> */}
            <WithLabel
              className="flex justify-between items-center w-full"
              labelClassName="mb-0"
              label="Select Product(s)"
            >
              <Selector
                options={products}
                containerClassName="w-full max-w-[200px]"
                value={product}
                onChange={(val) => setProduct(val)}
              />
            </WithLabel>
            <CustomInput
              className="px-4 py-2 h-[42px] text-base border-[#e5e7eb] font-semibold max-w-[200px]"
              label="Amount"
              labelClassName="text-base"
              containerClassName="flex justify-between items-center w-full"
              placeholder={nairaSign}
            />
            <button
              className="bg-mPrimary text-white w-full rounded-md py-2"
              onClick={onClose}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { ReactNode, useContext, useState } from "react";
import { SearchBar } from "../searchbar";
import { BiChevronDown } from "react-icons/bi";
import { DownloadButton } from "../download-button";
import { cx } from "class-variance-authority";
import { nairaSign } from "@/utils/utils";
import { Pagination } from "./pagination";
import { IoMdAdd } from "react-icons/io";
import { OverlayContext, OverlayContextType } from "@/context/overlay.context";
import { useMediaQuery } from "@/utils/hooks";
import { IoFilterOutline } from "react-icons/io5";
import { Loader } from "../loader";
import { AiOutlineRise } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { policyCategories } from "@/types/types";
import { PageFilter } from "./page-filter";

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
  pageSize?: number;
  filterClassName?: string;
  downloadClassName?: string;
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
  pageSize,
  totalItems,
  filterClassName,
  downloadClassName,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [product, setProduct] = useState<string>(policyCategories[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchText, setSearchText] = useState("");

  const { setNewAgentOverlayOpened } = useContext(
    OverlayContext
  ) as OverlayContextType;

  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (isMediaQueryMatched == undefined) return <></>;

  return (
    <>
      {!isMediaQueryMatched && (
        <div className="px-5 pb-10 max-w-[850px] mx-auto">
          <header className="mb-8">
            <h1 data-testid="pageTitle" className="font-semibold text-2xl mb-6">
              {title}
            </h1>
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
                product={product}
                startDate={startDate}
                endDate={endDate}
                setProduct={setProduct}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                isMediaQueryMatched={isMediaQueryMatched}
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
                  pageSize={pageSize || 10}
                  onPageChange={onPageChange ? onPageChange : () => {}}
                />
              </>
            )}
          </main>
        </div>
      )}
      {isMediaQueryMatched && (
        <div
          className="mx-auto max-w-6xl mt-12 mb-16"
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
              containerClassName="w-[332px] h-10 border border-[#e0e0e0] transition focus-within:border-[#333]"
            />
            <div id="dates" className="flex flex-row items-center space-x-3">
              <button
                className="text-[#333333]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen((isFilterOpen) => !isFilterOpen);
                }}
              >
                <div
                  className={twMerge(
                    "space-x-2 flex flex-row items-center px-4 py-2 rounded border border-[#E0E0E0] bg-white text-[#4F4F4F] text-sm font-semibold",
                    filterClassName
                  )}
                >
                  <span className="text-base">Filter</span>
                  <BiChevronDown
                    className={cx(
                      "transition-all duration-300",
                      isFilterOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>
              <DownloadButton className={downloadClassName} data={[]} />
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
            </div>
            <PageFilter
              isFilterOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              product={product}
              startDate={startDate}
              endDate={endDate}
              setProduct={setProduct}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              isMediaQueryMatched={isMediaQueryMatched}
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
              <div className="mb-10">{pageTable}</div>
              <Pagination
                currentPage={page || 1}
                itemsCount={totalItems || 10}
                pageSize={pageSize || 10}
                onPageChange={onPageChange ? onPageChange : () => {}}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

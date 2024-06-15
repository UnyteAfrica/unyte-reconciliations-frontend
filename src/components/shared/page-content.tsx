import { ReactNode, useState } from "react";
import { Selector } from "./selector";
import { SearchBar } from "../searchbar";
import { BiChevronDown } from "react-icons/bi";
import { DownloadButton } from "../download-button";
import { cx } from "class-variance-authority";
import { WithLabel } from "./with-label";
import { CustomInput, DateInput } from "./input";
import { nairaSign } from "@/utils/utils";
import { Pagination } from "./pagination";

type PageContentProps = {
  pageTable: ReactNode;
  title: string;
};

export const periods = ["Daily", "Weekly", "Monthly", "Yearly"] as const;
export const products = [
  "Comprehensive",
  "Credit Life",
  "Card Protect",
  "Student",
  "Travel",
  "Device",
] as const;

export const PageContent: React.FC<PageContentProps> = ({
  pageTable,
  title,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [period, setPeriod] = useState<string>(periods[0]);
  const [product, setProduct] = useState<string>(products[0]);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date(1699885840400));
  const [endDate, setEndDate] = useState(new Date(1699885870400));

  const handleSearch = () => {
    //
  };

  return (
    <div
      className="mx-auto max-w-6xl mt-12 px-6 mb-16 lg:px-0"
      onClick={() => setIsFilterOpen(false)}
    >
      <div className="flex flex-row justify-between items-center mb-10 relative">
        <span className="text-3xl text-[#333333] font-semibold capitalize">
          {title}
        </span>
        <SearchBar
          handleSearch={handleSearch}
          placeholder="Find policy reference"
        />
        <div id="dates" className="flex flex-row items-center space-x-3">
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
            "bg-white px-5 py-10 absolute top-[50px] w-[450px] right-0 rounded-lg border border-[#ccc] space-y-6 transition-all overflow-hidden opacity-0",
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
            <button className="bg-primary text-white w-[115px] rounded-md py-2">
              Apply Filter
            </button>
          </div>
        </div>
      </div>
      <div className="mb-10">{pageTable}</div>
      <Pagination
        currentPage={page}
        itemsCount={56}
        pageSize={10}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

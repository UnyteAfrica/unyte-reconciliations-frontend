import { useMediaQuery } from "@/utils/hooks";
import { cx } from "class-variance-authority";
import _ from "lodash";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const { isMediaQueryMatched } = useMediaQuery(1024);

  return (
    <>
      {!isMediaQueryMatched && (
        <div className="mt-8 mx-auto w-[280px] flex items-center justify-between">
          <button
            className="flex items-center disabled:text-[#ccc]"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage == 1}
          >
            <FaChevronLeft className="inline-block mr-3" />
            Previous
          </button>
          <div className="bg-[#F2F2F2] px-6 py-2 rounded-lg">
            {currentPage}/{pagesCount}
          </div>
          <button
            className="flex items-center disabled:text-[#ccc]"
            disabled={currentPage == pagesCount}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
            <FaChevronRight className="inline-block ml-3" />
          </button>
        </div>
      )}
      {isMediaQueryMatched && (
        <nav className="flex space-x-4">
          <button
            className={cx(
              "px-5 py-2 rounded-md border text-sm font-medium",
              currentPage == 1 && "text-[#ccc]"
            )}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage == 1}
          >
            Previous
          </button>
          <ul className="flex space-x-2">
            {pages.map((page) => (
              <li
                className={cx(
                  "border rounded-md",
                  currentPage == page && "bg-primary text-white border-none"
                )}
                key={page}
                data-testid={currentPage == page && "active"}
              >
                <button
                  className="h-[38px] w-[38px]"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={cx(
              "px-5 py-2 rounded-md border text-sm font-medium",
              currentPage == pagesCount && "text-[#ccc]"
            )}
            disabled={currentPage == pagesCount}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
};

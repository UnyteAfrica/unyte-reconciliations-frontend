import { cx } from "class-variance-authority";
import _ from "lodash";

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

  return (
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
  );
};

import { cx } from "class-variance-authority";
import { Fragment, useEffect, useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type SelectorProps = {
  containerClassName?: string;
  selectorClassName?: string;
  options: readonly string[];
  value: string;
  onChange: (val: string) => void;
};

export const Selector: React.FC<SelectorProps> = ({
  containerClassName,
  selectorClassName,
  options,
  value,
  onChange,
}) => {
  const [isSelectorMenuOpen, setIsSelectorMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", (e) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsSelectorMenuOpen(false);
      }
    });
  }, []);

  return (
    <div className={cx("relative", containerClassName)} ref={containerRef}>
      <button
        className="px-4 py-2 text-[#333333] rounded-md border font-semibold w-full"
        onClick={() =>
          setIsSelectorMenuOpen((isSelectorMenuOpen) => !isSelectorMenuOpen)
        }
      >
        <div className="space-x-2 flex flex-row items-center justify-between">
          <span
            className={cx("text-base", selectorClassName)}
            title="selectBtn"
          >
            {value}
          </span>
          {isSelectorMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
        </div>
      </button>
      <div
        className={cx(
          "absolute z-20 w-full top-[45px] left-0 bg-white border rounded-lg border-[#e5e5e5] max-h-0 transition-all duration-300 overflow-hidden opacity-0",
          isSelectorMenuOpen && "max-h-[250px] opacity-100 overflow-y-auto"
        )}
      >
        {options.map((option, idx) => (
          <Fragment key={idx}>
            <button
              className="w-full font-inter py-4 font-semibold"
              onClick={() => {
                setIsSelectorMenuOpen(false);
                onChange(option);
              }}
            >
              {option}
            </button>
            <hr />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

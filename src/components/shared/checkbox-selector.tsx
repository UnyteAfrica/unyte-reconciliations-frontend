import { cx } from "class-variance-authority";
import { Fragment, useEffect, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { CheckboxInput } from "./checkbox-input";

type CheckboxSelectorProps = {
  containerClassName?: string;
  selectorClassName?: string;
  selectionMap: Record<string, boolean>;
  options: readonly string[];
  value: string;
  isCheckboxSelectorMenuOpen: boolean;
  setIsCheckboxSelectorMenuOpen: (
    val: boolean | ((val: boolean) => boolean)
  ) => void;
  onChange: (val: string, isSelected: boolean) => void;
  resetSelectedMap: () => void;
};

export const CheckboxSelector: React.FC<CheckboxSelectorProps> = ({
  containerClassName,
  selectorClassName,
  options,
  value,
  onChange,
  selectionMap,
  isCheckboxSelectorMenuOpen,
  setIsCheckboxSelectorMenuOpen,
  resetSelectedMap,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", (e) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsCheckboxSelectorMenuOpen(false);
      }
    });
  }, []);

  return (
    <div
      className={cx("relative", containerClassName)}
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="px-4 py-2 text-[#333333] rounded-md border font-semibold w-full"
        onClick={() => {
          setIsCheckboxSelectorMenuOpen(
            (isCheckboxSelectorMenuOpen) => !isCheckboxSelectorMenuOpen
          );
        }}
      >
        <div className="space-x-2 flex flex-row items-center justify-between">
          <span
            className={cx("text-base", selectorClassName)}
            title="selectBtn"
          >
            {value || "None"}
          </span>
          {isCheckboxSelectorMenuOpen ? (
            <BiChevronUp />
          ) : (
            <BiChevronDown
              onClick={(e) => {
                e.stopPropagation();
                setIsCheckboxSelectorMenuOpen(true);
              }}
            />
          )}
        </div>
      </button>
      <div
        className={cx(
          "absolute z-20 w-full top-[45px] left-0 bg-white border rounded-lg border-[#e5e5e5] max-h-0 transition-all duration-300 overflow-hidden opacity-0",
          isCheckboxSelectorMenuOpen &&
            "max-h-[200px] opacity-100 overflow-y-auto"
        )}
      >
        <Fragment>
          <div className="w-full font-inter p-4 font-semibold">
            <button onClick={resetSelectedMap}>Reset</button>
          </div>
          <hr />
        </Fragment>
        {options.map(
          (option, idx) =>
            option && (
              <Fragment key={idx}>
                <div className="w-full font-inter p-4 font-semibold">
                  <CheckboxInput
                    label={option || "None"}
                    className="mb-0"
                    onClick={() => onChange(option, !selectionMap[option])}
                    onChange={(e) => onChange(option, e.target.checked)}
                    checked={selectionMap[option]}
                    name="policy-type"
                  />
                </div>
                <hr />
              </Fragment>
            )
        )}
      </div>
    </div>
  );
};

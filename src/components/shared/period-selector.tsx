import { cx } from "class-variance-authority";
import { Fragment, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const periods = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

export const PeriodSelector = () => {
  const [isPeriodMenuOpen, setIsPeriodMenuOpen] = useState(false);
  const [period, setPeriod] = useState<(typeof periods)[number]>(periods[0]);

  return (
    <div className="relative">
      <button
        className="px-4 py-2 text-[#333333] rounded-md border font-semibold w-[120px]"
        onClick={() =>
          setIsPeriodMenuOpen((isPeriodMenuOpen) => !isPeriodMenuOpen)
        }
      >
        <div className="space-x-2 flex flex-row items-center justify-center">
          <span className="text-base" title="periodBtn">
            {period}
          </span>
          {isPeriodMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
        </div>
      </button>
      <div
        className={cx(
          "absolute top-[45px] left-0 w-[120px] bg-white border rounded-lg border-[#e5e5e5] max-h-0 transition-all duration-300 overflow-hidden opacity-0",
          isPeriodMenuOpen && "max-h-[250px] opacity-100"
        )}
      >
        {periods.map((period, idx) => (
          <Fragment key={idx}>
            <button
              className="w-full font-inter py-4 font-semibold"
              onClick={() => {
                setIsPeriodMenuOpen(false);
                setPeriod(period);
              }}
            >
              {period}
            </button>
            <hr />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

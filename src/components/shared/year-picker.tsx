import { ComponentProps } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";
import { ClassNameValue, twMerge } from "tailwind-merge";

type YearPickerProps = {
  className?: ClassNameValue;
  date?: Moment;
} & ComponentProps<typeof Datetime>;

export const YearPicker: React.FC<YearPickerProps> = ({
  className,
  date,
  ...props
}) => {
  return (
    <Datetime
      dateFormat="YYYY"
      initialViewMode="years"
      value={date}
      className={twMerge(
        "border border-[#ccc] rounded-lg p-2 font-inter font-semibold",
        className
      )}
      renderInput={(props, openCalendar, _) => {
        return (
          <div
            className="w-[50px]"
            onClick={() => {
              openCalendar();
            }}
          >
            <input
              {...props}
              className="w-[50px] text-center cursor-pointer"
              value={props.value.substring(0, 4)}
            />
          </div>
        );
      }}
      {...props}
    />
  );
};

const YEAR_1999 = moment("2000");
const endOfCurrentYear = moment().endOf("year");

type RangeYearPickerProps = {
  className?: ClassNameValue;
  startYear?: Moment;
  endYear?: Moment;
  onStartYearChange?: ((value: moment.Moment | string) => void) | undefined;
  onEndYearChange?: ((value: moment.Moment | string) => void) | undefined;
} & ComponentProps<typeof Datetime>;

export const RangeYearPicker: React.FC<RangeYearPickerProps> = ({
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
}) => {
  return (
    <div className="flex flex-col min-[450px]:flex-row">
      <YearPicker
        className="sm:rounded-r-none"
        date={startYear}
        onChange={onStartYearChange}
        isValidDate={(currDate) =>
          currDate.isAfter(YEAR_1999) && currDate.isBefore(endOfCurrentYear)
        }
      />
      <YearPicker
        className="sm:rounded-l-none"
        date={endYear}
        onChange={onEndYearChange}
        isValidDate={(currDate: Moment) =>
          currDate.isAfter(startYear) && currDate.isBefore(endOfCurrentYear)
        }
      />
    </div>
  );
};

import moment, { Moment } from "moment";
import React, { ComponentProps } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

type MonthPickerProps = {
  className?: ClassNameValue;
  date?: Moment;
} & ComponentProps<typeof Datetime>;

export const MonthPicker: React.FC<MonthPickerProps> = ({
  className,
  date,
  ...props
}) => {
  return (
    <Datetime
      dateFormat="MM"
      initialViewMode="months"
      value={date}
      className={twMerge(
        "border border-[#ccc] rounded-lg p-2 font-inter font-semibold",
        className
      )}
      renderInput={(props, openCalendar, _) => {
        return (
          <div
            className="w-[100px]"
            onClick={() => {
              openCalendar();
            }}
          >
            <input
              {...props}
              className="w-[100px] text-center cursor-pointer"
              value={date?.format("MMMM")}
            />
          </div>
        );
      }}
      {...props}
    />
  );
};

const YEAR_1999 = moment("2000");
const endOfCurrentMonth = moment().endOf("month");

type RangeMonthPickerProps = {
  className?: ClassNameValue;
  startMonth?: Moment;
  endMonth?: Moment;
  onStartMonthChange?: ((value: moment.Moment | string) => void) | undefined;
  onEndMonthChange?: ((value: moment.Moment | string) => void) | undefined;
} & ComponentProps<typeof Datetime>;

export const RangeMonthPicker: React.FC<RangeMonthPickerProps> = ({
  startMonth,
  endMonth,
  onStartMonthChange,
  onEndMonthChange,
}) => {
  return (
    <div className="flex flex-col min-[450px]:flex-row">
      <MonthPicker
        className="sm:rounded-r-none"
        date={startMonth}
        onChange={onStartMonthChange}
        isValidDate={(currDate) =>
          currDate.isAfter(YEAR_1999) && currDate.isBefore(endOfCurrentMonth)
        }
      />
      <MonthPicker
        className="sm:rounded-l-none"
        date={endMonth}
        onChange={onEndMonthChange}
        isValidDate={(currDate: Moment) =>
          currDate.isAfter(startMonth) && currDate.isBefore(endOfCurrentMonth)
        }
      />
    </div>
  );
};

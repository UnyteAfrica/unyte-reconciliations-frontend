import moment, { Moment } from "moment";
import { ComponentProps } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import Datetime from "react-datetime";
import { getWeekValue } from "@/utils/utils";

type WeekPickerProps = {
  className?: ClassNameValue;
  date?: Moment;
  displayedDate?: Moment;
  isCondensed?: boolean;
} & ComponentProps<typeof Datetime>;

export const WeekPicker: React.FC<WeekPickerProps> = ({
  className,
  date,
  displayedDate,
  isCondensed,
  ...props
}) => {
  return (
    <Datetime
      dateFormat="DD/MM"
      initialViewMode="days"
      value={date}
      className={twMerge(
        "border border-[#ccc] rounded-lg p-2 font-inter font-semibold",
        className
      )}
      renderInput={(props, openCalendar, _) => {
        return (
          <div
            onClick={() => {
              openCalendar();
            }}
          >
            <input
              {...props}
              className="w-full text-center cursor-pointer"
              value={
                displayedDate
                  ? getWeekValue(displayedDate, isCondensed)
                  : getWeekValue(date!, isCondensed)
              }
            />
          </div>
        );
      }}
      {...props}
    />
  );
};

const YEAR_1999 = moment("2000");
const endOfCurrentWeek = moment().endOf("week");

type RangeWeekPickerProps = {
  className?: ClassNameValue;
  startWeek: Moment;
  endWeek: Moment;
  isCondensed?: boolean;
  onStartWeekChange?: ((value: moment.Moment | string) => void) | undefined;
  onEndWeekChange?: ((value: moment.Moment | string) => void) | undefined;
} & ComponentProps<typeof Datetime>;

export const RangeWeekPicker: React.FC<RangeWeekPickerProps> = ({
  startWeek,
  endWeek,
  isCondensed,
  onStartWeekChange,
  onEndWeekChange,
}) => {
  return (
    <div className="flex justify-between w-full max-w-[300px] lg:max-w-[400px]">
      <WeekPicker
        className={twMerge("w-[48%] lg:rounded-r-none lg:w-1/2")}
        date={startWeek}
        isCondensed={isCondensed}
        displayedDate={startWeek.clone().startOf("week")}
        onChange={onStartWeekChange}
        isValidDate={(currDate) =>
          currDate.isBetween(YEAR_1999, endOfCurrentWeek)
        }
      />
      <WeekPicker
        className={twMerge("w-[48%] lg:rounded-l-none lg:w-1/2")}
        date={endWeek}
        isCondensed={isCondensed}
        onChange={onEndWeekChange}
        isValidDate={(currDate: Moment) =>
          currDate.isBetween(
            startWeek.clone().startOf("week").subtract(1, "day"),
            endOfCurrentWeek
          )
        }
      />
    </div>
  );
};

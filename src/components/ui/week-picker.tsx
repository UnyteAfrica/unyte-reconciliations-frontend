import moment, { Moment } from "moment";
import { ComponentProps } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import Datetime from "react-datetime";
import { getWeekValue } from "@/utils/utils";

type WeekPickerProps = {
  className?: ClassNameValue;
  date?: Moment;
} & ComponentProps<typeof Datetime>;

export const WeekPicker: React.FC<WeekPickerProps> = ({
  className,
  date,
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
            className="w-[150px]"
            onClick={() => {
              openCalendar();
            }}
          >
            <input
              {...props}
              className="w-[150px] text-center cursor-pointer"
              value={getWeekValue(date!)}
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
  onStartWeekChange?: ((value: moment.Moment | string) => void) | undefined;
  onEndWeekChange?: ((value: moment.Moment | string) => void) | undefined;
} & ComponentProps<typeof Datetime>;

export const RangeWeekPicker: React.FC<RangeWeekPickerProps> = ({
  startWeek,
  endWeek,
  onStartWeekChange,
  onEndWeekChange,
}) => {
  return (
    <div className="flex">
      <WeekPicker
        className="rounded-r-none"
        date={startWeek}
        onChange={onStartWeekChange}
        isValidDate={(currDate) =>
          currDate.isBetween(YEAR_1999, endOfCurrentWeek)
        }
      />
      <WeekPicker
        className="rounded-l-none"
        date={endWeek}
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

import moment, { Moment } from "moment";
import { ComponentProps } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import Datetime from "react-datetime";
import { getWeekValue } from "@/utils/utils";

type WeekPickerProps = {
  className?: ClassNameValue;
  date?: Moment;
  displayedDate?: Moment;
} & ComponentProps<typeof Datetime>;

export const WeekPicker: React.FC<WeekPickerProps> = ({
  className,
  date,
  displayedDate,
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
            className="w-[220px]"
            onClick={() => {
              openCalendar();
            }}
          >
            <input
              {...props}
              className="w-[220px] text-center cursor-pointer"
              value={
                displayedDate
                  ? getWeekValue(displayedDate)
                  : getWeekValue(date!)
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
    <div className="flex flex-col min-[450px]:flex-row">
      <WeekPicker
        className="sm:rounded-r-none"
        date={startWeek}
        displayedDate={startWeek.clone().startOf("week")}
        onChange={onStartWeekChange}
        isValidDate={(currDate) =>
          currDate.isBetween(YEAR_1999, endOfCurrentWeek)
        }
      />
      <WeekPicker
        className="sm:rounded-l-none"
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

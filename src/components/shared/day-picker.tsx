import moment, { Moment } from "moment";
import { ComponentProps } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

type DayPickerProps = {
  className?: ClassNameValue;
  date?: Moment;
  isCondensed?: boolean;
} & ComponentProps<typeof Datetime>;

export const DayPicker: React.FC<DayPickerProps> = ({
  className,
  date,
  isCondensed = false,
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
              className={twMerge("text-center cursor-pointer w-full")}
              value={
                isCondensed
                  ? date?.format("DD-MM-YYYY")
                  : date?.format("MMMM DD, YYYY")
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
const endOfCurrentDay = moment().endOf("day");

type RangeDayPickerProps = {
  startDay?: Moment;
  endDay?: Moment;
  isCondensed?: boolean;
  onStartDayChange?: ((value: moment.Moment | string) => void) | undefined;
  onEndDayChange?: ((value: moment.Moment | string) => void) | undefined;
} & ComponentProps<typeof Datetime>;

export const RangeDayPicker: React.FC<RangeDayPickerProps> = ({
  startDay,
  endDay,
  onStartDayChange,
  onEndDayChange,
  isCondensed = false,
}) => {
  return (
    <div className="flex justify-between w-full max-w-[300px] lg:max-w-[365px]">
      <DayPicker
        className={twMerge("w-[48%] lg:rounded-r-none lg:w-1/2")}
        date={startDay}
        onChange={onStartDayChange}
        isCondensed={isCondensed}
        isValidDate={(currDate) =>
          currDate.isAfter(YEAR_1999) && currDate.isBefore(endOfCurrentDay)
        }
      />
      <DayPicker
        className={twMerge("w-[48%] lg:rounded-l-none lg:w-1/2")}
        date={endDay}
        onChange={onEndDayChange}
        isCondensed={isCondensed}
        isValidDate={(currDate: Moment) =>
          currDate.endOf("day").isAfter(startDay) &&
          currDate.startOf("day").isBefore(endOfCurrentDay)
        }
      />
    </div>
  );
};

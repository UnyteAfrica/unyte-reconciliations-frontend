import moment, { Moment } from "moment";
import { ComponentProps } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

type DayPickerProps = {
  className?: ClassNameValue;
  date?: Moment;
} & ComponentProps<typeof Datetime>;

export const DayPicker: React.FC<DayPickerProps> = ({
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
              value={date?.format("MMMM DD, YYYY")}
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
  className?: ClassNameValue;
  startDay?: Moment;
  endDay?: Moment;
  onStartDayChange?: ((value: moment.Moment | string) => void) | undefined;
  onEndDayChange?: ((value: moment.Moment | string) => void) | undefined;
} & ComponentProps<typeof Datetime>;

export const RangeDayPicker: React.FC<RangeDayPickerProps> = ({
  startDay,
  endDay,
  onStartDayChange,
  onEndDayChange,
}) => {
  return (
    <div className="flex flex-col min-[450px]:flex-row">
      <DayPicker
        className="sm:rounded-r-none"
        date={startDay}
        onChange={onStartDayChange}
        isValidDate={(currDate) =>
          currDate.isAfter(YEAR_1999) && currDate.isBefore(endOfCurrentDay)
        }
      />
      <DayPicker
        className="sm:rounded-l-none"
        date={endDay}
        onChange={onEndDayChange}
        isValidDate={(currDate: Moment) =>
          currDate.endOf("day").isAfter(startDay) &&
          currDate.startOf("day").isBefore(endOfCurrentDay)
        }
      />
    </div>
  );
};

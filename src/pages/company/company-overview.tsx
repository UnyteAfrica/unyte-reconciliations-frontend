import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getWeekValue, nairaSign } from "@/utils/utils";

import { Selector } from "@/components/shared/selector";
import { periods } from "@/components/shared/page-content";
import { useMediaQuery } from "@/utils/hooks";
import { RangeYearPicker } from "@/components/shared/year-picker";
import { RangeDayPicker } from "@/components/shared/day-picker";
import { RangeWeekPicker } from "@/components/shared/week-picker";
import moment, { Moment } from "moment";
import { random } from "lodash";
import { RangeMonthPicker } from "@/components/shared/month-picker";

type Stat = {
  title: string;
  value: string;
};

const stats: Stat[] = [
  {
    title: "number of policies sold",
    value: "20,000 policies",
  },
  {
    title: "total value of policies",
    value: `${nairaSign}220,000,000.00`,
  },
];

const dailyChartDataSeries: ApexAxisChartSeries = [
  {
    name: "Policies Sold",
    data: [
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(7)),
      //   y: 1292,
      // },
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(6)),
      //   y: 4432,
      // },
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(5)),
      //   y: 5423,
      // },
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(4)),
      //   y: 6653,
      // },
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(3)),
      //   y: 8133,
      // },
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(2)),
      //   y: 7132,
      // },
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(1)),
      //   y: 7332,
      // },
      // {
      //   x: formatMillisecondsDateToDDMM(dateOffset(0)),
      //   y: 6553,
      // },
    ],
  },
];

const defaultChartDataOptions: ApexCharts.ApexOptions = {
  chart: {
    height: 100,
    type: "bar",
    fontFamily: "Inter",
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
    },
  },
  colors: ["#25D366"],
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ["Actual"],
  },
  fill: {
    type: "pattern",
    colors: ["#25D366"],
    pattern: {
      style: "slantedLines",
      width: 6,
      height: 6,
      strokeWidth: 2,
    },
  },
};

export const CompanyOverview: React.FC = () => {
  const [startDay, setStartDay] = useState<Moment>(moment());
  const [endDay, setEndDay] = useState<Moment>(moment());
  const [startWeek, setStartWeek] = useState<Moment>(moment());
  const [endWeek, setEndWeek] = useState<Moment>(moment());
  const [startMonth, setStartMonth] = useState<Moment>(moment());
  const [endMonth, setEndMonth] = useState<Moment>(moment());
  const [startYear, setStartYear] = useState<Moment>(moment());
  const [endYear, setEndYear] = useState<Moment>(moment());
  const [period, setPeriod] = useState<string>(periods[0]);
  const [chartDataSeries, setChartDataSeries] =
    useState<ApexAxisChartSeries>(dailyChartDataSeries);
  const [chartDataOptions] = useState<ApexCharts.ApexOptions>(
    defaultChartDataOptions
  );

  const { isMediaQueryMatched } = useMediaQuery(1024);

  const updateDailySeries = () => {
    const dailyChartSeries: {
      name: string;
      data: { x: string; y: number }[];
    }[] = [
      {
        name: "Daily Overview",
        data: [],
      },
    ];
    const curr = startDay.clone();
    while (!curr.isAfter(endDay)) {
      const x = curr.format("DD/MM");
      const y = random(1, 10000);
      dailyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "day");
    }

    setChartDataSeries(dailyChartSeries);
  };

  const updateWeeklySeries = () => {
    const weeklyChartSeries: {
      name: string;
      data: { x: string; y: number }[];
    }[] = [
      {
        name: "Weekly Overview",
        data: [],
      },
    ];
    const curr = startWeek.clone().startOf("week");
    const end = endWeek.clone().endOf("week");
    while (!curr.isAfter(end)) {
      const x = getWeekValue(curr);
      const y = random(1, 10000);
      weeklyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "week");
    }

    setChartDataSeries(weeklyChartSeries);
  };

  const updateMonthlySeries = () => {
    const monthlyChartSeries: {
      name: string;
      data: { x: string; y: number }[];
    }[] = [
      {
        name: "Monthly Overview",
        data: [],
      },
    ];
    const curr = startMonth.clone();
    while (!curr.isAfter(endMonth)) {
      const x = curr.format("MM YYYY");
      const y = random(1, 10000);
      monthlyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "month");
    }

    setChartDataSeries(monthlyChartSeries);
  };

  const updateYearlySeries = () => {
    const yearlyChartSeries: {
      name: string;
      data: { x: string; y: number }[];
    }[] = [
      {
        name: "Yearly Overview",
        data: [],
      },
    ];
    const curr = startYear.clone();
    while (!curr.isAfter(endYear)) {
      const x = curr.format("YYYY");
      const y = random(1, 10000);
      yearlyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "year");
    }

    setChartDataSeries(yearlyChartSeries);
  };

  useEffect(() => {
    switch (period) {
      case periods[0]:
        updateDailySeries();
        break;
      case periods[1]:
        updateWeeklySeries();
        break;
      case periods[2]:
        updateMonthlySeries();
        break;
      case periods[3]:
        updateYearlySeries();
        break;
    }
  }, [period]);

  // Update chart to reflect monthly period
  useEffect(() => {
    updateMonthlySeries();
  }, [startMonth, endMonth]);

  // Update chart to reflect yearly period
  useEffect(() => {
    updateYearlySeries();
  }, [startYear, endYear]);

  // Update chart to reflect daily period
  useEffect(() => {
    updateWeeklySeries();
  }, [startWeek, endWeek]);

  // Update chart to reflect daily period
  useEffect(() => {
    updateDailySeries();
  }, [startDay, endDay]);

  return (
    <>
      {!isMediaQueryMatched && (
        <div className="px-5 py-6 max-w-[850px] mx-auto">
          <div className="flex flex-row justify-between items-center mb-10">
            <h1 className="text-3xl text-[#333333] font-semibold">Overview</h1>
          </div>
          <div className="my-8 w-[200px] sm:w-auto sm:flex sm:space-x-4">
            <Selector
              options={periods}
              value={period}
              onChange={(val) => setPeriod(val)}
              containerClassName="mb-4 sm:mb-0"
            />
            <div className="flex">
              {period == periods[3] ? (
                <RangeYearPicker
                  startYear={startYear}
                  endYear={endYear}
                  onStartYearChange={(date) => {
                    if (moment.isMoment(date)) {
                      setStartYear(date);
                    }
                  }}
                  onEndYearChange={(date) => {
                    if (moment.isMoment(date)) {
                      setEndYear(date);
                    }
                  }}
                />
              ) : (
                <></>
              )}
              {period == periods[2] ? (
                <RangeMonthPicker
                  startMonth={startMonth}
                  endMonth={endMonth}
                  onStartMonthChange={(date) => {
                    if (moment.isMoment(date)) {
                      setStartMonth(date);
                    }
                  }}
                  onEndMonthChange={(date) => {
                    if (moment.isMoment(date)) {
                      setEndMonth(date);
                    }
                  }}
                />
              ) : (
                <></>
              )}
              {period == periods[1] ? (
                <RangeWeekPicker
                  startWeek={startWeek}
                  endWeek={endWeek}
                  onStartWeekChange={(date) => {
                    if (moment.isMoment(date)) {
                      setStartWeek(date);
                    }
                  }}
                  onEndWeekChange={(date) => {
                    if (moment.isMoment(date)) {
                      setEndWeek(date);
                    }
                  }}
                />
              ) : (
                <></>
              )}
              {period == periods[0] ? (
                <RangeDayPicker
                  startDay={startDay}
                  endDay={endDay}
                  onStartDayChange={(date) => {
                    if (moment.isMoment(date)) {
                      setStartDay(date);
                    }
                  }}
                  onEndDayChange={(date) => {
                    if (moment.isMoment(date)) {
                      setEndDay(date);
                    }
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-5 mr-8">
              <em className="not-italic block text-[#4F4F4F] text-xs mb-2">
                Number of policies sold
              </em>
              <em className="not-italic block text-[#333] text-xl font-semibold">
                20,000 policies
              </em>
            </div>
            <div className="mb-8">
              <em className="not-italic block text-[#4F4F4F] text-xs mb-2">
                Total value of policies sold
              </em>
              <em className="not-italic block text-[#333] text-xl font-semibold">
                {nairaSign}150,000.00
              </em>
            </div>
          </div>
          <hr />
          <div className="mt-10">
            {/* <p className="text-sm text-[#4F4F4F] mb-4">
              Showing data for the month of{" "}
              <span className="font-semibold text-[#333]">September</span>
            </p> */}
            <Chart
              options={chartDataOptions}
              series={chartDataSeries}
              type="bar"
              height={400}
            />
          </div>
        </div>
      )}
      {isMediaQueryMatched && (
        <div className="mx-auto max-w-6xl mt-12 px-6 lg:px-0">
          <div className="flex flex-row justify-between items-center mb-10">
            <span className="text-3xl text-[#333333] font-semibold">
              Overview
            </span>

            <div id="dates" className="flex flex-row items-center space-x-3">
              <Selector
                options={periods}
                value={period}
                onChange={(val) => setPeriod(val)}
              />
              <div className="flex">
                {period == periods[3] ? (
                  <RangeYearPicker
                    startYear={startYear}
                    endYear={endYear}
                    onStartYearChange={(date) => {
                      if (moment.isMoment(date)) {
                        setStartYear(date);
                      }
                    }}
                    onEndYearChange={(date) => {
                      if (moment.isMoment(date)) {
                        setEndYear(date);
                      }
                    }}
                  />
                ) : (
                  <></>
                )}
                {period == periods[2] ? (
                  <RangeMonthPicker
                    startMonth={startMonth}
                    endMonth={endMonth}
                    onStartMonthChange={(date) => {
                      if (moment.isMoment(date)) {
                        setStartMonth(date);
                      }
                    }}
                    onEndMonthChange={(date) => {
                      if (moment.isMoment(date)) {
                        setEndMonth(date);
                      }
                    }}
                  />
                ) : (
                  <></>
                )}
                {period == periods[1] ? (
                  <RangeWeekPicker
                    startWeek={startWeek}
                    endWeek={endWeek}
                    onStartWeekChange={(date) => {
                      if (moment.isMoment(date)) {
                        setStartWeek(date);
                      }
                    }}
                    onEndWeekChange={(date) => {
                      if (moment.isMoment(date)) {
                        setEndWeek(date);
                      }
                    }}
                  />
                ) : (
                  <></>
                )}
                {period == periods[0] ? (
                  <RangeDayPicker
                    startDay={startDay}
                    endDay={endDay}
                    onStartDayChange={(date) => {
                      if (moment.isMoment(date)) {
                        setStartDay(date);
                      }
                    }}
                    onEndDayChange={(date) => {
                      if (moment.isMoment(date)) {
                        setEndDay(date);
                      }
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mb-24">
            {stats.map((stat, idx) => (
              <div key={idx} className="rounded p-6 border w-[30rem]">
                <p className="text-sm text-[#4F4F4F] mb-8 uppercase">
                  {stat.title}
                </p>
                <p className="text-xl text-[#333333] font-medium">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="border rounded p-10 mb-40">
            <Chart
              options={chartDataOptions}
              series={chartDataSeries}
              type="bar"
              height={400}
            />
          </div>
        </div>
      )}
    </>
  );
};

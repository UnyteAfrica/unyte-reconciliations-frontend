import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Selector } from "@/components/shared/selector";
import { useMediaQuery } from "@/utils/hooks";
import moment, { Moment } from "moment";
import { random } from "lodash";
import { RangeYearPicker } from "@/components/shared/year-picker";
import { RangeMonthPicker } from "@/components/shared/month-picker";
import { RangeWeekPicker } from "@/components/shared/week-picker";
import { RangeDayPicker } from "@/components/shared/day-picker";
import { formatToNaira, getWeekValue } from "@/utils/utils";
import { PERIODS } from "@/components/shared/page-content";
import { Icon } from "@/components/shared/icon";

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

const POLICY_COST = 2000;

export const AgentOverview: React.FC = () => {
  const [startDay, setStartDay] = useState<Moment>(moment());
  const [endDay, setEndDay] = useState<Moment>(moment());
  const [startWeek, setStartWeek] = useState<Moment>(moment());
  const [endWeek, setEndWeek] = useState<Moment>(moment());
  const [startMonth, setStartMonth] = useState<Moment>(moment());
  const [endMonth, setEndMonth] = useState<Moment>(moment());
  const [startYear, setStartYear] = useState<Moment>(moment());
  const [endYear, setEndYear] = useState<Moment>(moment());
  const [period, setPeriod] = useState<string>(PERIODS.DAILY);
  const [chartDataSeries, setChartDataSeries] =
    useState<ApexAxisChartSeries>(dailyChartDataSeries);
  const [totalPolicyValue, setTotalPolicyValue] = useState(0);

  const chartDataOptions: ApexCharts.ApexOptions = {
    yaxis: {
      show: true,
      title: {
        offsetX: -5,
        text: "Value of Policies Sold",
        style: {
          fontSize: "16px",
        },
      },
    },
    xaxis: {
      title: {
        text: `${period} Period`,
        style: {
          fontSize: "16px",
        },
      },
    },
    chart: {
      height: 100,
      type: "bar",
      fontFamily: "Inter",
      toolbar: {
        show: false,
      },
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
    let total = 0;
    while (!curr.isAfter(endDay)) {
      const x = curr.format("DD/MM");
      const y = random(1, 10000);
      total += y;
      dailyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "day");
    }
    setTotalPolicyValue(total);
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
    let total = 0;
    while (!curr.isAfter(end)) {
      const x = getWeekValue(curr);
      const y = random(1, 10000);
      total += y;
      weeklyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "week");
    }
    setTotalPolicyValue(total);
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
    let total = 0;
    while (!curr.isAfter(endMonth)) {
      const x = curr.format("MM/YYYY");
      const y = random(1, 10000);
      total += y;
      monthlyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "month");
    }
    setTotalPolicyValue(total);
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
    let total = 0;
    while (!curr.isAfter(endYear)) {
      const x = curr.format("YYYY");
      const y = random(1, 10000);
      total += y;
      yearlyChartSeries[0].data.push({
        x,
        y,
      });
      curr.add(1, "year");
    }
    setTotalPolicyValue(total);
    setChartDataSeries(yearlyChartSeries);
  };

  useEffect(() => {
    switch (period) {
      case PERIODS.DAILY:
        updateDailySeries();
        break;
      case PERIODS.WEEKLY:
        updateWeeklySeries();
        break;
      case PERIODS.MONTHLY:
        updateMonthlySeries();
        break;
      case PERIODS.YEARLY:
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

  const policyCount = Math.floor(totalPolicyValue / POLICY_COST);

  return (
    <>
      {!isMediaQueryMatched && (
        <div className="px-5 py-6 max-w-[850px] mx-auto bg-[#F8F8F8]">
          <div className="flex flex-row justify-between items-center mb-10">
            <h1 className="text-3xl text-[#333333] font-semibold">Overview</h1>
          </div>
          <div className="my-8 w-[200px] sm:w-auto sm:flex sm:space-x-4">
            <Selector
              options={Object.values(PERIODS)}
              value={period}
              onChange={(val) => setPeriod(val)}
              containerClassName="mb-4 sm:mb-0"
            />
            <div className="flex">
              {period == PERIODS.YEARLY ? (
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
              {period == PERIODS.MONTHLY ? (
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
              {period == PERIODS.WEEKLY ? (
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
              {period == PERIODS.DAILY ? (
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
          <div className="flex">
            <div className="mb-5 mr-4 border border-[#7EE0A3]/[0.5] rounded-2xl p-4 w-[48%] max-w-[165px]">
              <div className="border border-[#25D366] rounded-full mb-4 inline-block p-1">
                <Icon type="receipt" />
              </div>
              <em className="not-italic block text-[#4F4F4F] text-xs mb-1">
                Policies sold
              </em>
              <em className="not-italic block text-[#333] text-xl font-semibold">
                {policyCount ?? 1} {policyCount <= 1 ? "policy" : "policies"}
              </em>
            </div>
            <div className="mb-5 border border-[#7EE0A3]/[0.5] rounded-2xl p-4 w-[48%] max-w-[165px]">
              <div className="border border-[#25D366] rounded-full mb-4 inline-block p-1">
                <Icon type="dollar" />
              </div>
              <em className="not-italic block text-[#4F4F4F] text-xs mb-2">
                Sales value
              </em>
              <em className="not-italic block text-[#333] text-xl font-semibold">
                {formatToNaira(totalPolicyValue)}
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
        <div className="mx-auto max-w-6xl mt-12 px-5 py-8">
          <div className="flex flex-row justify-between items-center mb-10">
            <span className="text-3xl text-[#333333] font-semibold">
              Overview
            </span>
            <div id="dates" className="flex flex-row items-center space-x-3">
              <Selector
                options={Object.values(PERIODS)}
                value={period}
                onChange={(val) => setPeriod(val)}
              />
              <div className="flex">
                {period == PERIODS.YEARLY ? (
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
                {period == PERIODS.MONTHLY ? (
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
                {period == PERIODS.WEEKLY ? (
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
                {period == PERIODS.DAILY ? (
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
            <div className="rounded p-6 border w-[30rem]">
              <p className="text-sm text-[#4F4F4F] mb-8 uppercase">
                number of policies sold
              </p>
              <p className="text-xl text-[#333333] font-medium">
                {Math.floor(totalPolicyValue / POLICY_COST)} policies
              </p>
            </div>
            <div className="rounded p-6 border w-[30rem]">
              <p className="text-sm text-[#4F4F4F] mb-8 uppercase">
                total value of policies
              </p>
              <p className="text-xl text-[#333333] font-medium">
                {formatToNaira(totalPolicyValue)}
              </p>
            </div>
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

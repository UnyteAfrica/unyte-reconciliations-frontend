import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { formatToNaira, getWeekValue, sanitizePremium } from "@/utils/utils";

import { Selector } from "@/components/shared/selector";
import { PERIODS } from "@/components/shared/page-content";
import { useMediaQuery } from "@/utils/hooks";
import { RangeYearPicker } from "@/components/shared/year-picker";
import { RangeDayPicker } from "@/components/shared/day-picker";
import { RangeWeekPicker } from "@/components/shared/week-picker";
import moment, { Moment } from "moment";

import { RangeMonthPicker } from "@/components/shared/month-picker";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { getDateRangePolicies } from "@/services/api/api-company";
import { Loader } from "@/components/loader";
import { DateRangePolicy } from "@/types/types";

type PolicyDateMapType = { [key: string]: number };

const defaultChartDataSeries: ApexAxisChartSeries = [
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
  tooltip: {
    x: {
      show: true,
    },
  },
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
  xaxis: {},
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

export const CompanyOverview: React.FC = () => {
  const [startDay, setStartDay] = useState<Moment>(moment());
  const [endDay, setEndDay] = useState<Moment>(moment());
  const [startWeek, setStartWeek] = useState<Moment>(moment());
  const [endWeek, setEndWeek] = useState<Moment>(moment());
  const [startMonth, setStartMonth] = useState<Moment>(moment());
  const [endMonth, setEndMonth] = useState<Moment>(moment());
  const [startYear, setStartYear] = useState<Moment>(moment());
  const [endYear, setEndYear] = useState<Moment>(moment());
  const [activeStartDate, setActiveStartDate] = useState<Moment>(moment());
  const [activeEndDate, setActiveEndDate] = useState<Moment>(moment());
  const [period, setPeriod] = useState<string>(PERIODS.DAILY);
  const [policyCountMap, setPolicyCountMap] = useState<{
    [key: string]: number;
  }>({});
  const [chartDataSeries, setChartDataSeries] = useState<ApexAxisChartSeries>(
    defaultChartDataSeries
  );
  const [chartDataOptions, setChartDataOptions] =
    useState<ApexCharts.ApexOptions>(defaultChartDataOptions);

  const [totalPolicyValue, setTotalPolicyValue] = useState(0);
  const [totalPolicyCount, setTotalPolicyCount] = useState(0);

  const {
    data: dateRangePoliciesData,
    isPending: isDateRangePoliciesLoading,
    // error: dateRangePoliciesError,
  } = useQuery({
    queryKey: [
      CompanyQueryKeys.dateRangePolicies,
      activeStartDate,
      activeEndDate,
    ],
    queryFn: () => getDateRangePolicies(activeStartDate, activeEndDate),
  });

  useEffect(() => {
    const newChartDataOptions: ApexCharts.ApexOptions = {
      tooltip: {
        x: {
          show: true,
          formatter: (num) => {
            const policyCount = policyCountMap[num.toString()];
            return `
              <strong>${policyCount} ${
              policyCount == 1 ? "Policy" : "Policies"
            } Sold</strong>
            `;
          },
        },
        // y: {
        //   formatter: (num) => {
        //     console.log("Y Formatter", num);
        //     return "World";
        //   },
        //   title: {
        //     formatter: (num) => {
        //       console.log("Y Title Formatter", num);
        //       return "Foo";
        //     },
        //   },
        // },
      },
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
    setChartDataOptions(newChartDataOptions);
  }, [policyCountMap, period]);

  const { isMediaQueryMatched } = useMediaQuery(1024);

  const updateDailySeries = (dateRangePolicies: DateRangePolicy[]) => {
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
    let policyCount = 0;

    const policyDateMap: PolicyDateMapType = {};
    const iPolicyCountMap: PolicyDateMapType = {};
    for (let dateRangePolicy of dateRangePolicies) {
      let sanitizedPremium = sanitizePremium(dateRangePolicy.premium);
      policyDateMap[dateRangePolicy.date_sold] =
        (policyDateMap[dateRangePolicy.date_sold] ?? 0) +
        Number(sanitizedPremium ?? 1000);
      iPolicyCountMap[dateRangePolicy.date_sold] =
        (iPolicyCountMap[dateRangePolicy.date_sold] ?? 0) + 1;
      policyCount++;
    }
    while (!curr.isAfter(endDay)) {
      const x = curr.format("YYYY-MM-DD");
      if (x in policyDateMap) {
        const y = policyDateMap[x];
        total += y;
        dailyChartSeries[0].data.push({
          x,
          y,
        });
      }
      curr.add(1, "day");
    }

    setTotalPolicyValue(total);
    setTotalPolicyCount(policyCount);
    setChartDataSeries(dailyChartSeries);
    setPolicyCountMap(iPolicyCountMap);
  };

  const updateWeeklySeries = (dateRangePolicies: DateRangePolicy[]) => {
    const weeklyChartSeries: {
      name: string;
      data: { x: string; y: number }[];
    }[] = [
      {
        name: "Weekly Overview",
        data: [],
      },
    ];

    const policyDateMap: PolicyDateMapType = {};
    const iPolicyCountMap: PolicyDateMapType = {};
    let policyCount = 0;
    for (let dateRangePolicy of dateRangePolicies) {
      const dateStr = dateRangePolicy.date_sold;
      const date = moment(dateStr, "YYYY-MM-DD");
      const weekVal = getWeekValue(date);
      let sanitizedPremium = sanitizePremium(dateRangePolicy.premium);
      policyDateMap[weekVal] =
        (policyDateMap[weekVal] ?? 0) + Number(sanitizedPremium ?? 1000);
      iPolicyCountMap[weekVal] = (iPolicyCountMap[weekVal] ?? 0) + 1;
      policyCount++;
    }
    const curr = startWeek.clone().startOf("week");
    const end = endWeek.clone().endOf("week");
    let total = 0;
    while (!curr.isAfter(end)) {
      const x = getWeekValue(curr);
      if (x in policyDateMap) {
        const y = policyDateMap[x];
        total += y;
        weeklyChartSeries[0].data.push({
          x,
          y,
        });
      }

      curr.add(1, "week");
    }
    setTotalPolicyValue(total);
    setTotalPolicyCount(policyCount);
    setChartDataSeries(weeklyChartSeries);
    setPolicyCountMap(iPolicyCountMap);
  };

  const updateMonthlySeries = (dateRangePolicies: DateRangePolicy[]) => {
    const monthlyChartSeries: {
      name: string;
      data: { x: string; y: number }[];
    }[] = [
      {
        name: "Monthly Overview",
        data: [],
      },
    ];
    let policyCount = 0;
    const policyDateMap: PolicyDateMapType = {};
    const iPolicyCountMap: PolicyDateMapType = {};
    for (let dateRangePolicy of dateRangePolicies) {
      const dateStr = dateRangePolicy.date_sold;
      const date = moment(dateStr, "YYYY-MM-DD");
      const monthVal = date.format("MM/YYYY");
      let sanitizedPremium = sanitizePremium(dateRangePolicy.premium);
      policyDateMap[monthVal] =
        (policyDateMap[monthVal] ?? 0) + Number(sanitizedPremium ?? 1000);
      iPolicyCountMap[monthVal] = (iPolicyCountMap[monthVal] ?? 0) + 1;
      policyCount++;
    }

    const curr = startMonth.clone();
    let total = 0;
    while (!curr.isAfter(endMonth)) {
      const x = curr.format("MM/YYYY");
      if (x in policyDateMap) {
        const y = policyDateMap[x];
        total += y;
        monthlyChartSeries[0].data.push({
          x,
          y,
        });
      }
      curr.add(1, "month");
    }
    setTotalPolicyValue(total);
    setTotalPolicyCount(policyCount);
    setChartDataSeries(monthlyChartSeries);
    setPolicyCountMap(iPolicyCountMap);
  };

  const updateYearlySeries = (dateRangePolicies: DateRangePolicy[]) => {
    const yearlyChartSeries: {
      name: string;
      data: { x: string; y: number }[];
    }[] = [
      {
        name: "Yearly Overview",
        data: [],
      },
    ];

    const policyDateMap: PolicyDateMapType = {};
    const iPolicyCountMap: PolicyDateMapType = {};
    let policyCount = 0;
    for (let dateRangePolicy of dateRangePolicies) {
      const dateStr = dateRangePolicy.date_sold;
      const date = moment(dateStr, "YYYY-MM-DD");
      const yearVal = date.format("YYYY");
      let sanitizedPremium = sanitizePremium(dateRangePolicy.premium);
      policyDateMap[yearVal] =
        (policyDateMap[yearVal] ?? 0) + Number(sanitizedPremium ?? 1000);
      iPolicyCountMap[yearVal] = (iPolicyCountMap[yearVal] ?? 0) + 1;
      policyCount++;
    }

    const curr = startYear.clone();
    let total = 0;
    while (!curr.isAfter(endYear)) {
      const x = curr.format("YYYY");
      if (x in policyDateMap) {
        const y = policyDateMap[x];
        total += y;
        yearlyChartSeries[0].data.push({
          x,
          y,
        });
      }

      curr.add(1, "year");
    }
    setTotalPolicyValue(total);
    setTotalPolicyCount(policyCount);
    setChartDataSeries(yearlyChartSeries);
    setPolicyCountMap(iPolicyCountMap);
  };

  const setActiveDay = () => {
    setActiveStartDate(startDay);
    setActiveEndDate(endDay);
  };

  const setActiveWeek = () => {
    setActiveStartDate(startWeek.clone().startOf("week"));
    setActiveEndDate(endWeek.clone().endOf("week"));
  };

  const setActiveMonth = () => {
    setActiveStartDate(startMonth.clone().startOf("month"));
    setActiveEndDate(endMonth.clone().endOf("month"));
  };

  const setActiveYear = () => {
    setActiveStartDate(startYear.clone().startOf("year"));
    setActiveEndDate(endYear.clone().endOf("year"));
  };

  const dateRangePolicies = dateRangePoliciesData?.data;

  useEffect(() => {
    switch (period) {
      case PERIODS.DAILY:
        setActiveDay();
        break;
      case PERIODS.WEEKLY:
        setActiveWeek();
        break;
      case PERIODS.MONTHLY:
        setActiveMonth();
        break;
      case PERIODS.YEARLY:
        setActiveYear();
        break;
    }
  }, [period]);

  // Update chart to reflect monthly period
  useEffect(() => {
    setActiveMonth();
  }, [startMonth, endMonth]);

  // Update chart to reflect yearly period
  useEffect(() => {
    setActiveYear();
  }, [startYear, endYear]);

  // Update chart to reflect daily period
  useEffect(() => {
    setActiveWeek();
  }, [startWeek, endWeek]);

  // Update chart to reflect daily period
  useEffect(() => {
    setActiveDay();
  }, [startDay, endDay]);

  useEffect(() => {
    switch (period) {
      case PERIODS.DAILY:
        updateDailySeries(dateRangePolicies || []);
        break;
      case PERIODS.WEEKLY:
        updateWeeklySeries(dateRangePolicies || []);
        break;
      case PERIODS.MONTHLY:
        updateMonthlySeries(dateRangePolicies || []);
        break;
      case PERIODS.YEARLY:
        updateYearlySeries(dateRangePolicies || []);
        break;
    }
  }, [dateRangePoliciesData, period]);

  return (
    <>
      {!isMediaQueryMatched && (
        <div className="px-5 py-6 max-w-[850px] mx-auto">
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
          <div className="flex flex-wrap">
            <div className="mb-5 mr-8">
              <em className="not-italic block text-[#4F4F4F] text-xs mb-2">
                Number of policies sold
              </em>
              <em className="not-italic block text-[#333] text-xl font-semibold">
                {totalPolicyCount} policies
              </em>
            </div>
            <div className="mb-8">
              <em className="not-italic block text-[#4F4F4F] text-xs mb-2">
                Total value of policies sold
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
            {isDateRangePoliciesLoading ? (
              <Loader className="mx-auto mt-32 h-16 w-16" />
            ) : (
              <Chart
                options={chartDataOptions}
                series={chartDataSeries}
                type="bar"
                height={400}
              />
            )}
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
                {totalPolicyCount} policies
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
            {isDateRangePoliciesLoading ? (
              <Loader className="mx-auto h-16 w-16" />
            ) : (
              <Chart
                key={JSON.stringify(policyCountMap)}
                options={chartDataOptions}
                series={chartDataSeries}
                type="bar"
                height={400}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

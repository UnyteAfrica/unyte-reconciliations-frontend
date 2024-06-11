import { useState } from "react";
import Chart from "react-apexcharts";
import { nairaSign } from "@/utils/utils";
import { DateInput } from "@/components/shared/input";
import { Selector } from "@/components/shared/selector";
import { periods } from "../policies";

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

const chartData: {
  series: ApexAxisChartSeries;
  options: ApexCharts.ApexOptions;
} = {
  series: [
    {
      name: "Actual",
      data: [
        {
          x: "2011",
          y: 1292,
        },
        {
          x: "2012",
          y: 4432,
        },
        {
          x: "2013",
          y: 5423,
        },
        {
          x: "2014",
          y: 6653,
        },
        {
          x: "2015",
          y: 8133,
        },
        {
          x: "2016",
          y: 7132,
        },
        {
          x: "2017",
          y: 7332,
        },
        {
          x: "2018",
          y: 6553,
        },
      ],
    },
  ],
  options: {
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
  },
};

export const AgentOverview: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date(1699885840400));
  const [endDate, setEndDate] = useState(new Date());
  const [period, setPeriod] = useState<string>(periods[0]);

  return (
    <>
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
              <DateInput
                containerClassName="rounded-tr-none rounded-br-none font-semibold"
                date={startDate}
                onDateChange={(date) => setStartDate(date)}
              />
              <DateInput
                containerClassName="rounded-tl-none rounded-bl-none font-semibold"
                date={endDate}
                onDateChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-24">
          {stats.map((stat, idx) => (
            <div key={idx} className="rounded p-6 border w-[30rem]">
              <p className="text-sm text-[#4F4F4F] mb-8 uppercase">
                {stat.title}
              </p>
              <p className="text-xl text-[#333333] font-medium">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="border rounded p-10 mb-40">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={400}
          />
        </div>
      </div>
    </>
  );
};

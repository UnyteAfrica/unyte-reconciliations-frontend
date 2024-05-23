import { useState, useEffect, useContext } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Navigate } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";

import { UserContext } from "../context/user.context";
import { endpoint } from "../utils/config";

function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios(`${endpoint}/partner/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setUserData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [setUserData]);

  const chartData = {
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
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
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

  // if (!localStorage.getItem("token")) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <div className="mx-auto max-w-6xl mt-12 px-6 lg:px-0">
        <div className="flex flex-row justify-between items-center mb-10">
          <span className="text-3xl text-[#333333] font-semibold">
            Overview
          </span>
          <div id="dates" className="flex flex-row items-center space-x-3">
            <div className="relative">
              <button
                className="px-4 py-2 text-[#333333] rounded-md border"
                onClick={toggleDropdown}
              >
                <div className="space-x-2 flex flex-row items-center">
                  <span className="text-base">Today</span>
                  {isOpen ? <BiChevronUp /> : <BiChevronDown />}
                </div>
              </button>
              {/*isOpen && (
                <div className="absolute right-0 mt-2 py-2 bg-white shadow-lg rounded-md">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </a>
                </div>
              )*/}
            </div>
            <div className="px-4 py-2 border rounded-md">May 15, 2023</div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-24">
          <div className="rounded p-6 border w-[30rem]">
            <p className="text-base text-[#4F4F4F] mb-8">
              NUMBER OF POLICIES SOLD
            </p>
            <p className="text-xl text-[#333333] font-semibold">
              {userData?.policies_sold} policies
            </p>
          </div>
          <div className="rounded p-6 border w-[30rem]">
            <p className="text-base text-[#4F4F4F] mb-8">
              TOTAL VALUE OF POLICIES
            </p>
            <p className="text-xl text-[#333333] font-semibold">
              ₦220,000,000.00
            </p>
          </div>
        </div>
        <div className="border rounded p-10 mb-40">
          <Chart
            options={chartData}
            series={chartData.series}
            type="bar"
            height={400}
          />
        </div>
      </div>
    </>
  );
}

export default Overview;

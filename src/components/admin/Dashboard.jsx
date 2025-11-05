import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BsArrowRightCircleFill } from "react-icons/bs";
import security from "/images/security_management.svg";
import b2bflight from "/images/b2b_flight_management.svg";
import b2b_hotel from "/images/b2b_hotel_management.svg";
import coupon from "/images/coupon_management.svg";
// import b2c_booking from "/images/total_b2c_booking.svg";
import FlightBookDataTable from "./FlightBookDataTable";
import HotelBookDataTable from "./HotelBookDataTable";
import {Link } from 'react-router-dom'


const sections = [
  { percent: 30, label: "Active customer ", value: "565" },
  { percent: 3, label: "customer balance", value: "0" },
  { percent: 70, label: "total queries", value: "64" },
];

function Dashboard() {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <h1 className="text-xl md:text-2xl font-semibold text-[#15144E] mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button className="flex items-center justify-center gap-2 px-3 py-4 bg-[#EDF7FF] text-[#15144E] rounded-lg">
          <img
            src={security}
            alt="Security Management"
            className="w-7 h-7 sm:w-8 sm:h-8"
          />
          <span className="text-sm md:text-base font-normal text-center">
            Security Management
          </span>
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-4 bg-[#F6FFF3] text-[#15144E] rounded-lg">
          <img
            src={b2bflight}
            alt="Security Management"
            className="w-7 h-7 sm:w-8 sm:h-8 "
          />
          <span className="text-sm md:text-base font-normal text-center">
            B2B Flight Management{" "}
          </span>
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-4 bg-[#FAFFE6] text-[#15144E] rounded-lg">
          <img
            src={b2b_hotel}
            alt="B2B Hotel Management"
            className="w-7 h-7 sm:w-8 sm:h-8"
          />
          <span className="text-sm md:text-base font-normal text-center">
            B2B Hotel Management
          </span>
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-4 bg-[#F8F2FF] text-[#15144E] rounded-lg">
          <img
            src={coupon}
            alt="Coupon Management"
            className="w-7 h-7 sm:w-8 sm:h-8"
          />
          <span className="text-sm md:text-base font-normal text-center">
            Coupon Management
          </span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8 bg-white rounded-lg py-6">
        {sections.map((section, index) => {
          const COLORS = ["#39F908", "#9A9AFF", "#F6E228"];
          const bgCOLORS = ["#DFFFD8", "#EDEDFF", "#FFFBD7"];
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-[180px] sm:w-[200px] md:w-[240px]"
            >
              <div className="relative w-full aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Background Circle */}
                    <Pie
                      data={[{ value: 100 }]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="80%"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                      fill={bgCOLORS[index % bgCOLORS.length]}
                    />
                    <Pie
                      data={[
                        { value: section.percent },
                        { value: 100 - section.percent },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="80%"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      <Cell fill={COLORS[index % COLORS.length]} />
                      <Cell fill="transparent" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-[#0C004C]">
                    {section.percent}%
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-[#7C7C7D]">{section.label}</p>
                <p className="text-base font-semibold text-[#15144E]">
                  {section.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-10 mb-6 gap-3">
        <h2 className="text-lg md:text-xl font-semibold text-[#15144E]">
          Flight Booking
        </h2>
        {/* <div className="flex items-center bg-white px-4 py-4 gap-3 rounded-md text-[#15144E]">
          <img src={b2c_booking} className="w-8 h-8"/>
          <span className="text-lg">Total B2C Booking</span>
          <span className="text-3xl font-medium">50</span>
        </div> */}
        <Link
          to="#"
          className="flex items-center justify-center gap-1 text-[#15144E] font-medium "
        >
          View All
          <BsArrowRightCircleFill className="ms-1 w-5 h-5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <FlightBookDataTable />
      </div>

      <div className="flex items-center justify-between mt-10 mb-6 rounded-lg mx-w-6xl">
        <h2 className="text-xl font-semibold text-[#15144E]">Hotel booking</h2>
        <Link
          to="#"
          className="flex items-center justify-center gap-1 text-[#15144E] font-medium "
        >
          View All
          <BsArrowRightCircleFill className="ms-1 w-5 h-5" />
        </Link>
      </div>
      <HotelBookDataTable />
    </div>
  );
}

export default Dashboard;

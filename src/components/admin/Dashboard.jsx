import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BsArrowRightCircleFill } from "react-icons/bs";
import security from '/images/security_management.svg'
import b2bflight from '/images/b2b_flight_management.svg'
import b2b_hotel from '/images/b2b_hotel_management.svg'
import coupon from '/images/coupon_management.svg'
import b2c_booking from '/images/total_b2c_booking.svg'
import FlightBookDataTable from './FlightBookDataTable'
import Checkbox from '../flight/filters/Checkbox';
// import HotelBookDataTable from './HotelBookDataTable'

const sections = [
  { percent: 30, label: 'Active customer ', value: '565' },
  { percent: 3, label: 'customer balance', value: '0' },
  { percent: 70, label: 'total queries', value: '64' },
];

function Dashboard() {

  return (
    <div className=''>
      <h1 className='text-xl font-semibold text-[#15144E] mb-6'>Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        <button className="flex items-center justify-center gap-2 px-2 py-5 bg-[#EDF7FF]  text-[#15144E] rounded-lg">
          <img src={security} alt="Security Management" className="w-8 h-8"/>
          <span className='text-sm font-normal'>Security Management</span>
        </button>

        <button className="flex items-center justify-center gap-2 px-2 py-5 bg-[#F6FFF3]  text-[#15144E] rounded-lg">
          <img src={b2bflight} alt="Security Management" className="w-8 h-8"/>
          <span className='text-sm font-normal'>B2B Flight Management </span>
        </button>

        <button className="flex items-center justify-center gap-2 px-2 py-5 bg-[#FAFFE6]  text-[#15144E] rounded-lg">
          <img src={b2b_hotel} alt="Security Management" className="w-8 h-8"/>
          <span className='text-sm font-normal'>B2B Hotel Management </span>
        </button>

        <button className="flex items-center justify-center gap-2 px-2 py-5 bg-[#F8F2FF]  text-[#15144E] rounded-lg">
          <img src={coupon} alt="Security Management" className="w-8 h-8"/>
          <span className='text-sm font-normal'>Coupon Management</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center bg-white rounded-lg">
        {sections.map((section, index) => {
          const COLORS = ['#39F908','#9A9AFF', '#F6E228'];
          const bgCOLORS = ['#DFFFD8','#EDEDFF','#FFFBD7'];
          return (
          <div key={index} className="flex flex-col items-center justify-center py-5" >
            
            <div className="relative w-[250px] h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feOffset dx="0" dy="0" />
                      <feGaussianBlur stdDeviation="3" result="offset-blur" />
                      <feComposite
                        operator="out"
                        in="SourceGraphic"
                        in2="offset-blur"
                        result="inverse"
                      />
                      <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color" />
                      <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                      <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                    </filter>
                  </defs>
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
                <span className="text-2xl font-bold text-[#0C004C]">
                  {section.percent}%
                </span>  
              </div>
            </div>

            <div className="text-md text-[#7C7C7D]  text-center">
              <p className='font-normal'>
                  {section.label}
                </p>
                <p className='font-bold'>
                  {section.value}
                </p>
              </div>
          </div>
        );
      })}
      </div>

  
      
      <div className="flex items-center justify-between mt-10 mb-6 rounded-lg mx-w-6xl">
        <h2 className="text-xl font-semibold text-[#15144E]">Flight Booking</h2>
        {/* <div className="flex items-center bg-white px-4 py-4 gap-3 rounded-md text-[#15144E]">
          <img src={b2c_booking} className="w-8 h-8"/>
          <span className="text-lg">Total B2C Booking</span>
          <span className="text-3xl font-medium">50</span>
        </div> */}
        <a href="#" className="flex items-center justify-center gap-1 text-[#15144E] font-medium">
          View All
          <BsArrowRightCircleFill className="ms-1 w-5 h-5" />
        </a>
      </div>
      <FlightBookDataTable />


      {/* <div className="flex items-center justify-between mt-10 mb-6 rounded-lg mx-w-6xl">
        <h2 className="text-xl font-semibold text-[#15144E]">Hotel booking</h2>
        <a href="#" className="flex items-center justify-center gap-1 text-[#15144E] font-medium">
          View All
          <BsArrowRightCircleFill className="w-5 h-5" />
        </a>
      </div>
      <HotelBookDataTable  /> */}
    </div>
  )
}

export default Dashboard


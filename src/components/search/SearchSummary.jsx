import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import biDirectionalArrow from '../images/bidirectional_arrow.svg'
import FlightResults from '../flight/FlightResults'
import footerLogo from '../images/footer_image.svg'
import DepartDate from './DepartDate';

const SearchSummary = () => {
  const [tripType, setTripType] = useState('OneWay');
  const [fromCity] = useState({ code: 'WAW', city: 'Warsaw' });
  const [toCity] = useState({ code: 'DEL', city: 'New Delhi' });
  const [departDate] = useState({ date: "13 Oct'25", day: 'Mon' });
  const [returnDate] = useState(null);
  const [travelers] = useState({ count: 1, class: 'Economy' });
  const [filters] = useState({
    directFlight: true,
    nearbyAirport: false,
    studentFare: false,
    seniorCitizenFare: false,
  });

  return (
   <div className='max-w-6xl mx-auto mt-40'>
      <div className="flex flex-wrap justify-between items-center  gap-4  text-[#15144E]">
        {/* Trip Type Buttons */}
        <div className="flex items-center gap-3">
          {['One Way', 'Round Trip', 'Multi City'].map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`px-6 py-3 sm:text-sm md:text-base rounded-3xl ${
                tripType === type
                  ? 'bg-[#15144E] border border-[#15144E] text-white'
                  : 'bg-white border border-[#CACACA] text-[#15144E] hover:bg-[#f2f2f2]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-8 text-base">
          {[
            { label: 'Direct Flight', checked: filters.directFlight },
            { label: 'Nearby Airport', checked: filters.nearbyAirport },
            { label: 'Student Fare', checked: filters.studentFare },
            { label: 'Sr.Citizen Fare', checked: filters.seniorCitizenFare },
          ].map((filter) => (
            <label key={filter.label} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filter.checked}
            readOnly
            className="appearance-none w-5 h-5 border border-[#15144E] rounded bg-white checked:bg-white"
              style={{
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%", 
                backgroundImage: filter.checked
                  ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke='%23FCBE00' stroke-width='4' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M5 12l5 5L20 7'/%3E%3C/svg%3E\")"
                  : "none",
              }}
            />
            <span className="text-[#15144E] font-medium">{filter.label}</span>
          </label>

          ))}
        </div>
      </div>

      {/* Bottom Section: Search Summary */}
      <div className="bg-white my-5 rounded-2xl py-5 px-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-6  text-[#15144E]">
        {/* FROM */}
        <div className="flex flex-col">
          <p className="text-sm uppercase">From</p>
          <p>
            <span className="font-semibold text-base md:text-lg">{fromCity.city}</span>, <span className="font-normal text-sm uppercase">{fromCity.code}</span>
          </p>
        </div>

        {/* bidirectional_arrow  */}
        <div className="flex justify-center items-center w-full md:w-auto">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-[#CACACA]">
              <img
                src={biDirectionalArrow}
                alt="biDirectionalArrow"
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>

          {/* FROM */}
        <div className="flex flex-col">
          <p className="text-sm uppercase">To</p>
          <p>
            <span className="font-semibold text-base md:text-lg">{toCity.city}</span>, <span className="font-normal text-sm uppercase">{toCity.code}</span>
          </p>
        </div>

        {/* DEPART */}
          {/* <div className="flex flex-col">
            <div className='flex items-center gap-1'>
              <span className="block text-sm uppercase">Depart</span>
              <IoIosArrowDown  className="cursor-pointer"/>
            </div>
            <p className="text-base md:text-lg font-semibold text-[#15144E] flex items-center gap-1">
              {departDate.date}, {departDate.day}
              
            </p>
          </div> */}
          <DepartDate/>

        {/* RETURN */}
        <div className="flex flex-col">
          <div className='flex items-center gap-1'>
            <span className="text-sm uppercase">Return</span>
            <IoIosArrowDown  className="cursor-pointer"/>
          </div>
          <p className="text-sm">
            {returnDate ? returnDate.date : (
              <span>Add Return</span>
            )}
          </p>
        </div>

        {/* TRAVELERS */}
       <div className="flex flex-col">
        <p className="text-sm uppercase">{travelers.count} Traveler(s)</p>
        <p className="text-sm">{travelers.class}</p>
      </div>


        {/* Modify Search Button */}
          <div className="flex-shrink-0">
            <button className="ml-auto bg-[#15144E] text-white px-6 py-4 rounded-lg hover:bg-[#0f0e3c] transition" >
              Modify Search
            </button>
          </div>
      
      </div>
     <FlightResults/>
     
     <img src={footerLogo} alt="Footer Image" className="w-full h-auto" />
   </div>
  
  );
};

export default SearchSummary;

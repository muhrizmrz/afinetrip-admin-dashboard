import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import biDirectionalArrow from '../images/bidirectional_arrow.svg'
import footerLogo from '../images/footer_image.svg'
import FlightResults from '../flight/FlightResults'
import DepartDate from './DepartDate';

const SearchSummary = () => {
  const [tripType, setTripType] = useState('One Way');
  const [fromCity] = useState({ code: 'WAW', city: 'Warsaw' });
  const [toCity] = useState({ code: 'DEL', city: 'New Delhi' });
  const [departDate] = useState({ date: "13 Oct'25", day: 'Mon' });
  const [returnDate] = useState(null);
  const [travelers] = useState({ count: 1, class: 'Economy' });
  const [filters, setFilters] = useState({
    directFlight: true,
    nearbyAirport: false,
    studentFare: false,
    seniorCitizenFare: false,
  });

  return (
   <div className='max-w-6xl mx-auto mt-40'>
      <div className="flex flex-col sm:flex-wrap md:flex-nowrap md:flex-row justify-center md:justify-between items-center gap-4 text-[#15144E] text-center">
        {/* Trip Type Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {['One Way', 'Round Trip', 'Multi City'].map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`px-4 py-3 sm:px-6 sm:text-sm md:text-base rounded-3xl ${
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
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-sm mt-2 md:mt-0">
          {[
              { key: "directFlight", label: "Direct Flight" },
              { key: "nearbyAirport", label: "Nearby Airport" },
              { key: "studentFare", label: "Student Fare" },
              { key: "seniorCitizenFare", label: "Sr.Citizen Fare" },
          ].map((filter) => (
            <label key={filter.label} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[filter.key]}
              onChange={() =>
              setFilters((prev) => ({
                ...prev,
                [filter.key]: !prev[filter.key],
              }))
            }
            className="appearance-none w-5 h-5 border border-[#15144E] rounded bg-white checked:bg-white"
              style={{
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%", 
                backgroundImage: filters[filter.key]
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
      <div className="bg-white my-5  py-3 px-6 flex flex-col md:flex-row md:flex-nowrap items-center justify-between gap-6 text-[#15144E] rounded-2xl shadow-lg">
        {/* FROM */}
        <div className="flex flex-col items-start w-full md:w-auto text-center md:text-left  border rounded-xl border-[#ddd] p-3 md:border-0 md:rounded-none">
          <p className="text-sm uppercase">From</p>
          <p>
            <span className="font-semibold text-base md:text-lg">{fromCity.city}</span>,{" "} <span className="font-normal text-sm uppercase">{fromCity.code}</span>
          </p>
        </div>

        {/* bidirectional_arrow */}
        <div className="flex justify-center items-center w-full md:w-auto relative md:static">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-[#CACACA] shadow-md md:shadow-none absolute ">
            <img
              src={biDirectionalArrow}
              alt="biDirectionalArrow"
              className="w-5 h-5 object-contain rotate-85 md:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>


          {/* TO */}
        <div className="flex flex-col items-start w-full md:w-auto text-center md:text-left  border rounded-xl border-[#ddd] p-3 md:border-0 md:rounded-none">
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
        <div className="flex flex-col items-start w-full md:w-auto text-center md:text-left  border rounded-xl border-[#ddd] p-3 md:border-0 md:rounded-none">
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
       <div className="flex flex-col items-start w-full md:w-auto text-center md:text-left  border rounded-xl border-[#ddd] p-3 md:border-0 md:rounded-none">
        <p className="text-sm uppercase">{travelers.count} Traveler(s)</p>
        <p className="text-sm">{travelers.class}</p>
        </div>

        {/* Modify Search Button */}
          <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
            <button className="bg-[#15144E] text-white px-6 py-3 rounded-xl hover:bg-[#0f0e3c] transition w-full md:w-auto">
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

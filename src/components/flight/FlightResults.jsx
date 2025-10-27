import { React, useState } from 'react';
import calenderIcon from '/images/calender_icon.svg';
import { IoIosArrowDown } from "react-icons/io";
import { IoAirplane } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

import britishAirwaysLogo from '/images/british_airways_logo.svg';
import turkishAirlinesLogo from '/images/turkish_airlines_logo.svg';
import AirIndiaLogo from '/images/air_india_logo.svg';
import CheckIn from '/images/checkin_bag.svg';
import Cabin from '/images/cabin_bag.svg';
import Seat from '/images/seat.svg';

import SortedFlight from './SortedFlight';
import FareSlider from './FareSlider';

import StopsFilter from './filters/StopsFilter';
import TimeSelector from './filters/TimeSelector';
import PriceRangeFilter from './filters/PriceRangeFilter';
import FareTypeFilter from './filters/FareTypeFilter';
import AirlinesFilter from './filters/AirlinesFilter';
import ConnectingAirportsFilter from './filters/ConnectingAirportsFilter';

const FlightResults = ({ flights, totalFlights }) => {
  const defaultFlights = [
    {
      airline: 'Air India',
      flightNumber: 'G9-606',
      departureTime: '21:35',
      departureAirport: 'Warsaw, Terminal',
      duration: '15h 50m',
      stops: 'Non Stop',
      arrivalTime: '17:55',
      arrivalAirport: 'New Delhi, Terminal 3',
      price: '₹25,366',
      logo: AirIndiaLogo,
    },
    {
      airline: 'Turkish Airline',
      flightNumber: 'TK-1266',
      departureTime: '9:50',
      departureAirport: 'Warsaw, Terminal',
      duration: '14h 40m',
      stops: '1 Stop via Istanbul',
      arrivalTime: '05:00',
      arrivalAirport: 'New Delhi, Terminal 3',
      price: '₹50,089',
      logo: turkishAirlinesLogo,
    },
    {
      airline: 'LOT Polish',
      flightNumber: 'LO-319',
      departureTime: '16:35',
      departureAirport: 'Warsaw, Terminal',
      duration: '20h 35m',
      stops: '3 Stop via Milan Muscat',
      arrivalTime: '13:35',
      arrivalAirport: 'New Delhi, Terminal 3',
      price: '₹50,449',
      logo: turkishAirlinesLogo,
    },
    {
      airline: 'British Airways',
      flightNumber: 'G9-606',
      departureTime: '10:35',
      departureAirport: 'Warsaw, Terminal',
      duration: '18h 55m',
      stops: 'Non Stop',
      arrivalTime: '18:45',
      arrivalAirport: 'New Delhi, Terminal 3',
      price: '₹40,966',
      logo: britishAirwaysLogo,
    },
  ];

  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const flightsToShow = flights || defaultFlights;

  const handleToggleFare = (index) => {
    setSelectedFlightIndex(selectedFlightIndex === index ? null : index);
  };

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-6 mb-20">
      {/* Left Sidebar: Filters */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg text-[#15144E]">
        <h3 className="text-base font-normal mb-4 border-b border-b-[#B5B5B5]">Filters</h3>
        <StopsFilter />
        <TimeSelector title="Departure Time" />
        <TimeSelector title="Arrival Time" />
        <PriceRangeFilter />
        <FareTypeFilter />
        <AirlinesFilter />
        <ConnectingAirportsFilter />
      </div>

      {/* Right - Flight Listings */}
      <div className="w-full md:w-3/4">
        <div className="bg-white rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">
          {/* Left side */}
          <h2 className="text-md font-normal text-[#7C7C7C]">733 Flights</h2>

          {/* Right side */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-[#15144E] font-normal text-sm gap-3">
            <SortedFlight />
            <button className="text-[#15144E] flex items-center gap-3">
              <img src={calenderIcon} alt="Calendar Icon" />
              <span className="text-base">Show Fare Calendar</span>
              <div className="w-5 h-5 rounded-full border border-[#15144E] flex items-center justify-center">
                <IoIosArrowDown className="text-[#15144E] w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Flight Cards */}
        {flightsToShow.map((flight, index) => (
          <div key={index} className="mb-5">
            <div
              className={`bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
                selectedFlightIndex === index ? "rounded-t-lg" : "rounded-lg"
              }`}
            >
              {/* --- Flight Card Top --- */}
              <div className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                {/* Airline Info */}
                <div className="flex items-center sm:flex-col sm:items-start gap-3 sm:gap-0 w-full sm:w-auto">
                  <img src={flight.logo} alt={`${flight.airline} logo`} className="w-10 h-10" />
                  <div className="text-[#15144E] mt-2">
                    <p className="font-normal text-sm">{flight.airline}</p>
                    <p className="font-semibold text-base">{flight.flightNumber}</p>
                  </div>
                </div>

                {/* Departure */}
                <div className="text-center sm:text-left w-full sm:w-auto">
                  <p className="font-bold text-lg text-[#15144E]">{flight.departureTime}</p>
                  <p className="text-sm text-[#6E6E6E]">{flight.departureAirport}</p>
                </div>

                {/* Route & Duration */}
                <div className="text-center flex flex-col items-center w-full sm:w-2/6">
                  <p className="text-sm text-[#6F6F6F]">{flight.stops}</p>
                  <div className="flex items-center justify-center my-1 w-full max-w-[280px] text-[#C9C9C9]">
                    <GoDotFill className="inline-block text-sm flex-shrink-0" />
                    <hr className="flex-grow mx-2 border-gray-400 border-t-[1.5px]" />
                    <IoAirplane className="inline-block text-base flex-shrink-0" />
                  </div>
                  <p className="text-sm text-[#6F6F6F]">{flight.duration}</p>
                </div>

                {/* Arrival */}
                <div className="text-center sm:text-left w-full sm:w-auto">
                  <p className="font-bold text-lg text-[#15144E]">{flight.arrivalTime}</p>
                  <p className="text-sm text-[#6E6E6E]">{flight.arrivalAirport}</p>
                </div>

                {/* Price + Button */}
                <div className="flex flex-col text-center w-full sm:w-auto">
                  <p className="font-bold text-[#15144E] text-base">{flight.price}</p>
                  <button
                    className="border border-[#15144E] text-[#15144E] text-sm px-6 py-2 rounded-md my-2 w-full sm:w-auto"
                    onClick={() => handleToggleFare(index)}
                  >
                    {selectedFlightIndex === index ? "Hide Fare" : "View Fare"}
                  </button>
                </div>
              </div>

              <hr className="border-t border-[#C9C9C9]" />

              {/* --- Extra Flight Info Bar --- */}
              <div className="flex flex-wrap items-center justify-between text-sm text-[#6E6E6E] py-2 px-4 bg-white">
                <div className="flex flex-wrap justify-between items-center w-full gap-4">
                  {/* Check-In */}
                  <div className="flex items-center gap-2">
                    <img src={CheckIn} alt="Check-in" className="w-4 h-4" />
                    <span>Check-In: Adult - No Baggage</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img src={Cabin} alt="Cabin" className="w-4 h-4" />
                    <span>Cabin: Adult - 10kg</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img src={Seat} alt="Seat" className="w-4 h-4" />
                    <span>9 Seats Available</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#15144E] font-medium hover:underline cursor-pointer">
                    <span>Flight Details</span>
                    <IoIosArrowDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* --- FareSlider with Smooth Transition --- */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                selectedFlightIndex === index
                  ? " opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-20px]"
              }`}
            >
              {selectedFlightIndex === index && (
                <FareSlider selectedFlight={flight} closeFareDetails={() => handleToggleFare(index)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
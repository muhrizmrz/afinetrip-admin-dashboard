import React from 'react';
import { useState } from 'react';
import sunset from '../images/sunset.svg'
import sunrise from '../images/sunrise.svg'
import moon from '../images/moon.svg'
import full_sun from '../images/full_sun.svg'
import calenderIcon from '../images/calender_icon.svg'
import { IoIosArrowDown } from "react-icons/io";
import { IoAirplane } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import britishAirwaysLogo from '../images/british_airways_logo.svg'
import turkishAirlinesLogo from '../images/turkish_airlines_logo.svg'
import AirIndiaLogo from '../images/air_india_logo.svg'
import FareSlider from '../flight/FareSlider'

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

  
  const [showFareDetails, setShowFareDetails] = useState(false);
  
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const flightsToShow = flights || defaultFlights;

  const handleViewFare = (index) => {
    setSelectedFlightIndex(index);
  };

  const closeFareDetails = () => {
    setSelectedFlightIndex(null);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 mb-20">
        {/* Left Sidebar: Filters */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg text-[#15144E]">
          <h3 className="text-base font-normal mb-4  border-b border-b-[#B5B5B5]">Filters</h3>
          
          {/* Stops */}
          <div className="mb-6 ">
            <h4 className="font-semibold mb-3 text-lg">Stops</h4>
            <div className='flex flex-wrap justify-center items-center gap-4'>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                0 Stop
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                1 Stop
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                1+ Stop
              </label>
            </div>
          </div>

          {/* Departure Time */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-lg">Departure Time</h4>
            
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="flex flex-col items-center">
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'> 
                  <img src={sunrise} />
                </div>
                <p className='mt-2 text-sm font-normal'>05-12</p>
              </div>

              <div className='flex flex-col items-center'>
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'>
                  <img src={full_sun} /> 
                </div>
                <p className='mt-2 text-sm font-normal'>12-18</p>
              </div>

              <div className='flex flex-col items-center'>
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'>
                  <img src={sunset} />
                </div>
                <p className='mt-2 text-sm font-normal'>18-24</p>
              </div>
              
              <div className='flex flex-col items-center'>
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'>
                  <img src={moon} />
                </div>
                <p className='mt-2 text-sm font-normal'>00-05</p>
              </div>
            </div>
          </div>

          {/* Arrival Time */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-lg">Arrival Time</h4>
            
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="flex flex-col items-center">
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'> 
                  <img src={sunrise} />
                </div>
                <p className='mt-2 text-sm font-normal'>05-12</p>
              </div>

              <div className='flex flex-col items-center'>
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'>
                  <img src={full_sun} /> 
                </div>
                <p className='mt-2 text-sm font-normal'>12-18</p>
              </div>

              <div className='flex flex-col items-center'>
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'>
                  <img src={sunset} />
                </div>
                <p className='mt-2 text-sm font-normal'>18-24</p>
              </div>
              
              <div className='flex flex-col items-center'>
                <div className='w-10 h-10 flex items-center justify-center border border-[#9D9DAD] text-[#15144E] rounded-md'>
                  <img src={moon} />
                </div>
                <p className='mt-2 text-sm font-normal'>00-05</p>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-lg">Price Range</h4>
            <input type="range" className="w-full h-1 accent-[#15144E] rounded-lg cursor-pointer bg-[#E5E7EB] range-slider" min="7566" max="93066" />
            <div className="flex justify-between text-base font-semibold">
              <span>₹7,566</span>
              <span>₹9,3066</span>
            </div>
          </div>

          {/* Fare Type */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-lg">Fare Type</h4>
            <label className="flex items-center mb-2 text-base font-normal">
              <input type="checkbox" className="mr-3" />
              Normal Fare
            </label>
            <label className="flex items-center mb-3">
              <input type="checkbox" className="mr-3" />
              Branded Fare
            </label>
            <label className="flex items-center mb-3">
              <input type="checkbox" className="mr-3" />
              Published Fare
            </label>
            <label className="flex items-center mb-3">
              <input type="checkbox" className="mr-3" />
              Non-ref Fare
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              Others
            </label>
          </div>

          {/* Airlines */}
          <div className='mb-6'>
            <h4 className="font-semibold mb-3 text-lg">Airlines</h4>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                Austrian (5)
              </div>
              <span className='font-semibold'>₹7,306</span>
            </label>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                Air France (2)
              </div>
              <span className='font-semibold'>₹8,906</span>
            </label>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                British Airways (11)
              </div>
              <span className='font-semibold'>₹9,006</span>
            </label>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                Eurowings (1)
              </div>
              <span className='font-semibold'>₹9,3210</span>
            </label>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                Abu Dhabi
              </div>
              <span className='font-semibold'>₹9,415</span>
            </label>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                Athens
              </div>
              <span className='font-semibold'>₹9,440</span>
            </label>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                Bangalore
              </div>
              <span className='font-semibold'>₹9,089</span>
            </label>
          </div>

          {/* connectiong airport */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">connecting airports</h4>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                abu dhabi
              </div>
            </label>
            <label className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                amsterdam
              </div>
            </label>
            <label className='flex items-center justify-between mb-3'>
              <div className='flex items-center'>
                <input type='checkbox' className='mr-3' />
                athens
              </div>
            </label>
            <label className='flex items-center justify-between mb-3'>
              <div className='flex items-center'>
                <input type='checkbox' className='mr-3' />
                banglore
              </div>
            </label>
            <label className='flex items-center justify-between mb-3'>
              <div className='flex items-center'>
                <input type='checkbox' className='mr-3' />
                berlin
              </div>
            </label>
          </div>
        </div>

        {/* Right - Flight Listings */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-xl px-4 py-3 flex justify-between items-center mb-4">
            <h2 className="text-xl font-normal text-[#7C7C7C]">733 Flights</h2>
            <div className="flex items-center space-x-4 text-[#15144E] font-normal text-sm">
              <label>Sort by:</label>

              <div className="relative w-30">
                <select className="appearance-none border border-[#CACACA] px-4 py-2 pr-10 rounded focus:outline-none w-full">
                  <option>Price</option>
                  <option>Airline</option>
                  <option>Departure</option>
                  <option>Duration</option>
                  <option>Best Value</option>
                  <option>Arrival</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E7E7E] cursor-pointer" />
              </div>

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
          <div key={index} className="mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex flex-col">
                <img src={flight.logo} alt={`${flight.airline} logo`} className="w-10 h-10 mb-2" />
                <div className="text-[#15144E]">
                  <p className="font-normal text-sm">{flight.airline}</p>
                  <p className="font-semibold text-base">{flight.flightNumber}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-[#15144E]">{flight.departureTime}</p>
                <p className="text-sm text-[#6E6E6E]">{flight.departureAirport}</p>
              </div>
              <div className="text-center text-[#6E6E6E] flight-route">
                <p className="text-sm">{flight.stops}</p>
                <div className="icon-line">
                  <GoDotFill className="inline-block" />
                  <hr className="inline-block mx-2" />
                  <IoAirplane className="inline-block" />
                </div>
                <p>{flight.duration}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-[#15144E]">{flight.arrivalTime}</p>
                <p className="text-sm text-[#6E6E6E]">{flight.arrivalAirport}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-[#15144E]">{flight.price}</p>
                <button
                  className="border border-[#15144E] text-[#15144E] text-sm px-6 py-2 rounded-md mt-2"
                  onClick={() => handleViewFare(index)}
                >
                  View Fare
                </button>
              </div>
            </div>
            {/* Render FareSlider below the specific flight card */}
            {selectedFlightIndex === index && (
              <FareSlider selectedFlight={flight} closeFareDetails={closeFareDetails} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FlightResults;
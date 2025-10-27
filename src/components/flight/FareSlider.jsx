import { useState, useRef } from "react";
import cancellation from "/images/cancellation.svg";
import dataChange from "/images/data_change.svg";
import seatSelection from "/images/seat_selection.svg";
import checkedBag from "/images/checked_bag.svg";
import handBag from "/images/hand_bag.svg";
import meal from "/images/meal.svg";

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";

const FareSlider = ({ selectedFlight, closeFareDetails }) => {
  const [selectedFare, setSelectedFare] = useState("Basic1");
  const [startIndex, setStartIndex] = useState(0);
  const sliderRef = useRef(null);

  const fares = [
    {
      id: "Basic1",
      title: "Basic Fare",
      price: "₹ 25,996",
      cancellation: "INR 4,999 within 24 Hours\nINR 3,999 beyond 24 Hours",
      dateChange: "INR 4,999 upto 4 Hours",
      seat: "Standard: Chargeable\nXL Seats: Chargeable",
      checkedBag: "15 Kgs",
      handBag: "7 Kgs",
      meal: "Chargeable",
    },
    {
      id: "Basic2",
      title: "Basic Fare",
      price: "₹ 29,996",
      cancellation: "INR 4,999 within 24 Hours\nINR 3,999 beyond 24 Hours",
      dateChange: "INR 4,999 upto 4 Hours",
      seat: "Standard: Chargeable\nXL Seats: Chargeable",
      checkedBag: "15 Kgs",
      handBag: "7 Kgs",
      meal: "Chargeable",
    },
    {
      id: "ValueFlex",
      title: "Value Flex Fare",
      price: "₹ 28,445",
      cancellation: "INR 4,999 within 24 Hours\nINR 3,999 beyond 24 Hours",
      dateChange: "INR 4,999 upto 4 Hours",
      seat: "Standard: Chargeable\nXL Seats: Chargeable",
      checkedBag: "15 Kgs",
      handBag: "7 Kgs",
      meal: "Complimentary",
    },
    {
      id: "Basic3",
      title: "Basic Fare",
      price: "₹ 25,996",
      cancellation: "INR 4,999 within 24 Hours\nINR 3,999 beyond 24 Hours",
      dateChange: "INR 4,999 upto 4 Hours",
      seat: "Standard: Chargeable\nXL Seats: Chargeable",
      checkedBag: "15 Kgs",
      handBag: "7 Kgs",
      meal: "Chargeable",
    },
    {
      id: "Basic4",
      title: "Basic Fare",
      price: "₹ 29,996",
      cancellation: "INR 4,999 within 24 Hours\nINR 3,999 beyond 24 Hours",
      dateChange: "INR 4,999 upto 4 Hours",
      seat: "Standard: Chargeable\nXL Seats: Chargeable",
      checkedBag: "15 Kgs",
      handBag: "7 Kgs",
      meal: "Chargeable",
    },
  ];

  const services = [
    { icon: cancellation, text: "Cancellation\nFrom Departure Time" },
    { icon: dataChange, text: "Data Change\nFrom Departure Time" },
    { icon: seatSelection, text: "Seat Selection" },
    { icon: checkedBag, text: "Checked Bag" },
    { icon: handBag, text: "Hand Bag" },
    { icon: meal, text: "Meal" },
  ];

  const selectedFareObject = fares.find((fare) => fare.id === selectedFare);

  const faresToShow = 3;

  const handleNext = () => {
    if (startIndex + faresToShow < fares.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="bg-[#FFFAFA] p-6 relative shadow-md">
      <div className="absolute top-4 right-8 flex items-center gap-2 z-10">
        <button
          className={`text-3xl border border-[#E2E2E2] rounded-md p-1 ${
            startIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-[#15144E]"
          }`}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button
          className={`text-3xl border border-[#E2E2E2] rounded-md p-1 ${
            startIndex + faresToShow >= fares.length ? "text-gray-300 cursor-not-allowed" : "text-[#15144E]"
          }`}
          onClick={handleNext}
          disabled={startIndex + faresToShow >= fares.length}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>

      <div className="flex py-5 mt-6">
        {/* Fixed Services Column */}
        <div className="pr-4">
          <h3 className="font-semibold text-[#15144E] mb-4 text-lg">Services</h3>
          <ul className="space-y-4">
            {services.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#15144E] border-b border-b-[#EAEAEA] pb-2">
                <img src={item.icon} alt={item.text} className="w-5 h-5 object-contain mt-1" />
                <span className="text-base font-medium whitespace-pre-line">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sliding Fare Cards */}
        <div className="w-3/4 overflow-hidden ">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${startIndex * (100 / faresToShow)}%)` }}
            ref={sliderRef}
          >
            {fares.map((fare) => (
              <div
                key={fare.id}
                className=" px-2 flex-shrink-0">
                <div
                  className={`bg-white border border-[#E2E2E2] rounded-xl p-5 flex flex-col justify-between h-full ${
                    selectedFare === fare.id ? "border-[#15144E]" : ""
                  }`}
                >
                  <div>
                    <div className="flex justify-center items-center gap-2 mb-3">
                      <input
                        type="radio"
                        name="fare"
                        checked={selectedFare === fare.id}
                        onChange={() => setSelectedFare(fare.id)}
                        className="accent-[#15144E]"
                      />
                      <h4 className="font-semibold text-[#15144E] text-base">{fare.title}</h4>
                    </div>

                    <p className="text-center text-lg font-semibold border-b border-b-[#EAEAEA] text-[#15144E] mb-4">
                      {fare.price}
                    </p>

                    <div className="space-y-2 text-sm text-[#15144E]">
                      <p className="whitespace-pre-line border-b border-b-[#EAEAEA] pb-1">{fare.cancellation}</p>
                      <p className="border-b border-b-[#EAEAEA] pb-1">{fare.dateChange}</p>
                      <p className="whitespace-pre-line border-b border-b-[#EAEAEA] pb-1">{fare.seat}</p>
                      <p className="border-b border-b-[#EAEAEA] pb-1">{fare.checkedBag}</p>
                      <p className="border-b border-b-[#EAEAEA] pb-1">{fare.handBag}</p>
                      <p className="border-b border-b-[#EAEAEA] pb-1">{fare.meal}</p>
                    </div>
                  </div>

                  <button className="mt-6 bg-[#15144E] text-sm text-white py-2 rounded-lg font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between text-sm">
        <div className="flex items-center mt-auto">
          <IoIosInformationCircle className="text-[#E5BC3B] h-5 w-5" />
          <p className="text-[#15144E] text-xs ms-2">
            Transit Visa is mandatory requirement if there are via TWO Schengen countries or TWO stop in same countries
          </p>
        </div>

        <div className="flex flex-col items-center text-[#15144E] gap-2">
          <p className="text-lg font-semibold">{selectedFareObject?.price || "₹ 25,996"}</p>
          <button className="border border-[#15144E] text-[#15144E] text-sm px-4 py-2 rounded-md">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FareSlider;
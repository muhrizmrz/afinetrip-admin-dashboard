import { useState } from "react";
import cancellation from "../images/cancellation.svg";
import dataChange from "../images/data_change.svg";
import seatSelection from "../images/seat_selection.svg";
import checkedBag from "../images/checked_bag.svg";
import handBag from "../images/hand_bag.svg";
import meal from "../images/meal.svg";

import { IoIosInformationCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const FareSlider = ({ selectedFlight, closeFareDetails }) => {
  const [selectedFare, setSelectedFare] = useState("Basic1");

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
  
  return (
    <div className="bg-[#FFFAFA] p-6 rounded-xl mt-4 relative shadow-md">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-[#15144E] text-lg font-bold"
        onClick={closeFareDetails} ><IoCloseOutline />
      </button>

   
      <div className="grid grid-cols-4 gap-4">
        {/* Services Column */}
        <div className="col-span-1 border-r border-gray-200 pr-4">
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

        {/* Fare Cards */}
        {fares.map((fare) => (
          <div
            key={fare.id}
            className={`bg-white col-span-1 border border-[#E2E2E2] rounded-xl p-5 flex flex-col justify-between transition ${
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

            <button className="mt-6 bg-[#15144E] text-sm text-white py-2 rounded-lg font-medium ">
              Book Now
            </button>
          </div>
        ))}
        

      </div>
      <div className="w-full flex items-center justify-between text-sm mt-5">
        
            <div class="flex items-center">
                <IoIosInformationCircle className="text-[#E5BC3B] h-5 w-5" />
                <p className="text-[#15144E] text-xs ms-2">
                Transit Visa is mandatory requirement if there are via TWO Schengen countries or TWO stop in same countries
                </p>
            </div>

            <div class="flex items-center text-[#15144E]">
                <span className="text-lg font-semibold">{selectedFareObject?.price || "₹ 25,996"}</span>
                <button className="px-4 py-1 rounded text-sm font-medium">
                Book Now
                </button>
            </div>
        </div>
    </div>
  );
};

export default FareSlider;

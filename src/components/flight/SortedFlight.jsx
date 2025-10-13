import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function SortedFlight() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Price");

  const options = ["Price", "Airline", "Departure", "Duration", "Best Value", "Arrival"];

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-[#15144E]">Sort by:</label>
      <div className="relative w-40">
        <div className="border border-[#CACACA] rounded px-4 py-2 flex justify-between items-center cursor-default">
          <span>{selected}</span>
          <IoIosArrowDown
            className={`text-[#7E7E7E] cursor-pointer transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-1 bg-white border border-[#CACACA] rounded w-full shadow-md">
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";

export default function ExampleTrackChild({is_active}) {
  const [isActive, setIsActive] = useState(is_active);

  return (
    <div className="flex justify-center  items-center w-full  mx-auto">
      <button
        onClick={() => setIsActive(!isActive)}
        className={`relative flex items-center justify-around h-8 w-32 rounded-full transition-all duration-300 ${
          isActive ? "bg-[#15144E] text-white" : "bg-[#EEEEEE]"
        } `}
      >
        <span
          className={`text-sm transition-colors duration-300 cursor-pointer
          }`}
        >
          Inactive
        </span>
        <span
          className={`text-sm transition-colors duration-300 cursor-pointer
          `}
        >
          Active
        </span>

        {/* Thumb */}
        <div
          className={`
            absolute w-1/2 rounded-full  flex items-center justify-center text-sm transition-all  duration-300  
            ${
              isActive
                ? "left-0 top-1 bottom-1  ml-1 bg-[#EEEEEE] text-[#15144E] transition "
                : "left-1/2   bg-[#15144E] text-[#EEEEEE] h-full transition"
            }
          `}
        >
          {isActive ? "Inactive" : "Active"}
        </div>
      </button>
    </div>
  );
}

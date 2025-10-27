import React, { useState, useEffect } from "react";
import { Tooltip, Zoom } from "@mui/material";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const menuItems = [
  { name: 'Dashboard', image: '/images/dashboard.svg' },
  { name: 'Users & Partners', image: '/images/agent_management.svg' },
  { name: 'Inventory Hub', image: '/images/airport_management.svg' },
  { name: 'Integrations', image: '/images/api_management.svg' },
  { name: 'Finance & Payments', image: '/images/flight_management.svg' },
  { name: 'Content Management', image: '/images/hotel_management.svg' },
  { name: 'Marketing & Support', image: '/images/blog_management.svg' },
  { name: 'System Settings', image: '/images/currency_management.svg' },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const menuItemClasses = (isActive) => `w-full flex items-center gap-1 text-left mb-6 transition duration-500
    ${isActive ? "text-[#E5BC3B] text-sm" : " text-[#15144E] text-xs"}
    ${isMobile && !isExpanded ? "justify-center px-2" : "justify-start"} `;

  const iconClasses = (isActive) => 
    `object-contain transition duration-500 ${isActive ? "w-6 h-6" : "w-5 h-5"}`;

  const sidebarWidth = isMobile
    ? isExpanded
      ? "w-64"
      : "w-16"
    : "w-64";

  return (
    <nav className={` absolute rounded-xl md:rounded-none p-2 md:p-0 shadow-xl md:shadow-none transition duration-500 ${sidebarWidth} flex flex-col relative`}>

 {/* Mobile Expand/Collapse Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleExpand}
          className="absolute top-4 -right-3  bg-[#15144E] rounded-full shadow-md p-1 z-10 "
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <MdKeyboardArrowLeft className="w-5 h-5 text-[#fff]" />
          ) : (
            <MdKeyboardArrowRight className="w-5 h-5 text-[#fff]" />
          )}
        </button>
      )}

      <ul className="space-y-2 flex-1">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.name;

          return (
            <li key={index}>
              <Tooltip
                title={isMobile && !isExpanded ? item.name : ""}
                placement="right"
                open={isMobile && !isExpanded && Boolean(activeItem === item.name)}
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 200 }}
                PopperProps={{
                  sx: {
                    '& .MuiTooltip-tooltip': {
                      backgroundColor: '#15144E',
                      color: 'white',
                      fontSize: '0.875rem',
                      padding: '6px 10px',
                      borderRadius: '6px',
                    },
                  },
                }}
                disableHoverListener={!isMobile || isExpanded}>
                <button
  aria-label={item.name}
  onClick={() => setActiveItem(item.name)}
  className={`${menuItemClasses(isActive)} flex items-center justify-between w-full gap-2`}
>
  {/* Left side: icon + label */}
  <div className="flex items-center gap-2">
    <img
      src={item.image}
      alt={item.name}
      className={`${iconClasses(isActive)} w-5 h-5 object-contain`}
    />
    {(isMobile && isExpanded) || !isMobile ? (
      <span
        className={`transition duration-500 overflow-hidden whitespace-nowrap ${
          isMobile && !isExpanded
            ? "w-0 opacity-0"
            : "w-auto opacity-100 ml-1"
        }`}
      >
        {item.name}
      </span>
    ) : null}
  </div>

  {/* Right side: arrow (vertically centered, same line) */}
  {(isMobile && isExpanded) || !isMobile ? (
    <IoIosArrowDown className="text-[#15144E] text-base flex-shrink-0" />
  ) : null}
</button>


              </Tooltip>
            </li>
          );
        })}
      </ul>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-10px);
          }
        }
      `}</style>
    </nav>
  );
}
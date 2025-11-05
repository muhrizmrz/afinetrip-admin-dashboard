import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { sideBarMenuItems } from "./MenuItems";

export default function Sidebar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsExpanded(false);
      } else {
        setIsMobile(false);
        setIsExpanded(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSubMenu = (menuName) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName);
  };

  const getActiveItem = () => {
    for (const item of sideBarMenuItems) {
      if (item.link == location.pathname) return item.name;
      if (item.subItems) {
        const sub = item.subItems.find((s) => s.link == location.pathname);
        if (sub) return sub.name;
      }
    }
    return "Dashboard";
  };

  const activeItem = getActiveItem();

  // keep submenu opened
  // useEffect(() => {
  //   const parentWithActiveSub = menuItems.find((item) =>
  //     item.subItems?.some((sub) => sub.link === location.pathname)
  //   );
  //   if (parentWithActiveSub) setOpenSubMenu(parentWithActiveSub.name);
  // }, [location.pathname]);

  const menuItemClasses = (isActive) =>
    `w-full flex items-center text-[#15144E]
       transition duration-200 ${
         isActive ? " font-semibold" : "text-gray-600"
       } hover:text-[#2a2965]`;

  const iconClasses = (isActive) =>
    `object-contain transition duration-500 ${
      isActive ? "w-6 h-6" : "w-5 h-5"
    }`;
  const sidebarWidth = isMobile ? (isExpanded ? "w-64" : "w-16") : "w-64";
  return (
    <nav
      className={`relative transition-all duration-500 flex flex-col h-full ${sidebarWidth}`}
    >
      {/* Mobile Expand/Collapse Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="absolute top-1 right-2 bg-[#15144E] rounded-full shadow-md p-1 z-20"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <MdKeyboardArrowLeft className="w-5 h-5 text-white" />
          ) : (
            <MdKeyboardArrowRight className="w-5 h-5 text-white" />
          )}
        </button>
      )}

      <ul className="flex-1">
        {sideBarMenuItems.map((item, index) => {
          const isItemActive = activeItem === item.name;
          const isSubmenuOpen = openSubMenu === item.name;

          return (
            <li key={index} className="relative group">
              {/* Main Item */}
              <div
                onClick={() =>
                  item.subItems ? toggleSubMenu(item.name) : null
                }
                className={`cursor-pointer flex items-center ${menuItemClasses(
                  isItemActive
                )} ${isSubmenuOpen && item.subItems ? "mb-3" : "mb-5"}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={`${iconClasses(isItemActive)} object-contain`}
                />

                {isExpanded || !isMobile ? (
                  item.subItems ? (
                    <span className="ml-1 flex items-center justify-between w-full ">
                      <span>{item.name}</span>
                      <IoIosArrowDown
                        className={`transition-transform duration-300 ${
                          isSubmenuOpen ? "rotate-180" : ""
                        } text-[#15144E]`}
                      />
                    </span>
                  ) : (
                    <Link
                      to={item.link}
                      className={`transition duration-500 overflow-hidden whitespace-nowrap ml-1 ${
                        isMobile && !isExpanded
                          ? "w-0 opacity-0"
                          : "w-auto opacity-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                ) : null}
              </div>

              {/* Submenu */}
              {item.subItems && (
                <ul
                  className={`ml-10 overflow-hidden transition-all duration-300  ${
                    isSubmenuOpen && isExpanded
                      ? "max-h-40 opacity-100 mb-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subItems.map((sub, subIndex) => {
                    const isSubActive = location.pathname === sub.link;
                    return (
                      <li key={subIndex}>
                        <Link
                          to={sub.link}
                          className={` py-1 text-sm flex gap-1 items-end mb-1 ${
                            isSubActive
                              ? "text-[#15144E] font-semibold"
                              : "text-gray-600 hover:text-[#2a2965]"
                          }`}
                        >
                          {sub.image && (
                            <img
                              src={sub.image}
                              alt={sub.name}
                              className={`${iconClasses(
                                isItemActive
                              )} object-contain`}
                            />
                          )}
                          {sub.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

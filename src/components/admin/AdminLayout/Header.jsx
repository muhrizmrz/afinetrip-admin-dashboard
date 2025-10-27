import { useState } from "react";
import logo from "/images/logo.svg";

import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

export default function Header() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        {/* Logo */}
        <div className="flex items-center space-x-4 md:space-x-20">
          <img src={logo} alt="AFineTrip" className="h-auto w-28" />
        </div>

        {/* Right side desktop */}
        <div className="hidden md:flex items-center space-x-8 text-[16px] relative text-[#15144E] font-normal">
          {/* Quick Links Dropdown */}
          <div className="relative">
            <div className="flex items-center cursor-pointer space-x-2" onClick={() => setQuickLinksOpen(!quickLinksOpen)} >
              <span>Quick Links</span>
              <IoIosArrowDown className="w-4 h-4" />
            </div>

            {quickLinksOpen && (
              <div className="absolute left-0 mt-0 w-40 bg-white shadow-md rounded-lg border border-gray-200 z-50">
                <ul className="py-2 text-sm">
                  {[
                    "Offline Request",
                    "Search Itinerary",
                    "Travel Calendar",
                    "Hold Itineraries",
                    "Notice Board",
                    "Recharge",
                    "Airline Update",
                    "TAX Invoice Format",
                  ].map((item) => (
                    <li key={item} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <FaBell className="w-5 h-5 cursor-pointer" />

          <div className="relative">
            <div className="flex items-center space-x-2 cursor-pointer text-[18px]" onClick={() => setProfileOpen(!profileOpen)} >
              <FaUser className="w-4 h-4" />
                <span>Admin</span>
              <IoIosArrowDown className="w-4 h-4" />
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-lg border border-gray-200 z-50">
                <ul className="py-2 text-sm">
                  {["Profile", "Account Settings", "Logout"].map((item) => (
                    <li key={item} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu (Mobile/Tablet) */}
        <button className="md:hidden text-[#15144E] text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)} >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col space-y-4 px-6 py-4 text-[#15144E] text-[16px] font-normal">
      
            {/* Quick Links */}
            <div>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setQuickLinksOpen(!quickLinksOpen)}>
                <span>Quick Links</span>
                <IoIosArrowDown className={`w-4 h-4 transform transition-transform ${
                quickLinksOpen ? "rotate-180" : "rotate-0" }`} />
              </div>
              {quickLinksOpen && (
                <ul className="mt-2 ml-2 space-y-2 text-sm">
                  {[
                    "Offline Request",
                    "Search Itinerary",
                    "Travel Calendar",
                    "Hold Itineraries",
                    "Notice Board",
                    "Recharge",
                    "Airline Update",
                    "TAX Invoice Format",
                  ].map((item) => (
                    <li key={item} className="cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Profile */}
            <div>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setProfileOpen(!profileOpen)}>
                <span>Moideen Shibili</span>
                <IoIosArrowDown className={`w-4 h-4 transform transition-transform ${
                    profileOpen ? "rotate-180" : "rotate-0" }`} />
              </div>
              {profileOpen && (
                <ul className="mt-2 ml-2 space-y-2 text-sm">
                  {["Profile", "Account Settings", "Logout"].map((item) => (
                    <li key={item} className="cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

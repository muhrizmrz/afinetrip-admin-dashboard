import footer_logo from '/images/footer_logo.svg'
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-[#15144E] text-white py-6 sm:py-8">
      <div className="w-full lg:max-w-6xl px-4 sm:px-6 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-start">        {/* Logo and Mission Statement */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center mb-4">
            <img src={footer_logo} alt="Traveler" className="h-auto w-30 sm:w-28 lg:w-30" />
          </div>
          <p className="text-sm sm:text-sm leading-relaxed  text-[#D0D0D0]">At Afinetrip, we believe that every journey should be seamless, affordable, and unforgettable.</p>
        </div>

        {/* Travel Solution */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base font-medium mb-4">Travel Solution</h3>
          <ul className="space-y-3 text-[#D0D0D0] -xs sm:text-sm">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Flight</a></li>
            <li><a href="#" className="hover:text-gray-300">Hotel</a></li>
            <li><a href="#" className="hover:text-gray-300 ">Holiday</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base font-medium mb-4">Quick Links</h3>
          <ul className="space-y-3 text-[#D0D0D0] text-xs sm:text-sm">
            <li><a href="#" className="hover:text-gray-300">Notice Board</a></li>
            <li><a href="#" className="hover:text-gray-300">Recharge</a></li>
            <li><a href="#" className="hover:text-gray-300">Airline Update</a></li>
            <li><a href="#" className="hover:text-gray-300">Tax Invoice Format</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base font-medium mb-4">Company</h3>
          <ul className="space-y-3 text-[#D0D0D0] text-xs sm:text-sm">
            <li><a href="#" className="hover:text-gray-300">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Why Choose Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-base font-medium mb-4">Contact Us</h3>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li className="text-base font-medium">
              <span className="flex items-center gap-2"><IoLocation />Europe</span>
            </li>
            <li className='text-[#D0D0D0] text-sm leading-relaxed'>
              <p className='ms-6'>Afine Trip, Zurawia 43/10, Warszawa, Mazowieckie, Poland, 00-680</p>
            </li>
            <li className="text-base font-medium">
              <span className="flex items-center gap-2"><IoLocation />India</span>
            </li>
            <li className='text-[#D0D0D0] text-sm leading-relaxed'>
              <p className='ms-6'>Calicut Road, Perinthalmanna, Malappuram Kerala 679322, India +91 7661871111</p>
            </li>
            <li className='text-[#D0D0D0] text-sm leading-relaxed'>
              <div className="flex items-center gap-2"><MdEmail />Info@afinetrip.com</div>
              <div className='ms-6'>contact@afinetrip</div>
            </li>
            <li className='text-[#D0D0D0] text-sm leading-relaxed'>
              <div className="flex items-center gap-2"><FaPhone />Europe +48 532 872 000</div>
              <div className='ms-6'>India +91 7661-871111</div>
            </li>
          </ul>
        </div>
      </div>

      <div className='border-t border-[#2A2965] mt-6 sm:mt-8'></div>
      
      <div className="w-full lg:max-w-6xl px-4 sm:px-6 mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm text-[#D0D0D0] mt-4 space-y-2 sm:space-y-0">
        <p>Copyright © 2025 Afine Trip</p>
        <p>All Rights Reserved. | <a href="#" className="hover:text-gray-300">Terms & Conditions</a> | <a href="#" className="hover:text-gray-300">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
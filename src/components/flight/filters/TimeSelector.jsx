import React, { useState } from 'react';
import sunrise from '../../images/sunrise.svg';
import full_sun from '../../images/full_sun.svg';
import sunset from '../../images/sunset.svg';
import moon from '../../images/moon.svg';

const TimeSelector = ({ title }) => {
  const [selectedTimes, setSelectedTimes] = useState({
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });

  const timeSlots = [
    { icon: sunrise, label: '05-12', key: 'morning' },
    { icon: full_sun, label: '12-18', key: 'afternoon' },
    { icon: sunset, label: '18-24', key: 'evening' },
    { icon: moon, label: '00-05', key: 'night' },
  ];

  const handleChange = (key) => {
    setSelectedTimes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-3 text-md text-[#15144E]">{title}</h4>
      <div className="grid grid-cols-4 gap-3 text-center">
        {timeSlots.map(({ icon, label, key }) => (
          <div key={key} className="flex flex-col items-center">
            <button className={`w-10 h-10 flex items-center justify-center border rounded-md ${
              selectedTimes[key]
                ? 'border-[#15144E] bg-[#15144E]/10'
                : 'border-[#9D9DAD]'
              }`}
              onClick={() => handleChange(key)}>
              <img src={icon} alt={label} />
            </button>
            <p className="mt-2 text-sm font-normal">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
import React, { useState } from 'react';
import Checkbox from './Checkbox';

const ConnectingAirportsFilter = () => {
  const [airports, setAirports] = useState({
    abuDhabi: false,
    amsterdam: false,
    athens: false,
    bangalore: false,
    berlin: false,
  });

  const airportOptions = [
    { label: 'Abu Dhabi', key: 'abuDhabi' },
    { label: 'Amsterdam', key: 'amsterdam' },
    { label: 'Athens', key: 'athens' },
    { label: 'Bangalore', key: 'bangalore' },
    { label: 'Berlin', key: 'berlin' },
  ];

  const handleChange = (key) => {
    setAirports((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-3 text-md text-[#15144E]">Connecting Airports</h4>
      {airportOptions.map(({ label, key }) => (
        <Checkbox
          key={key}
          label={label}
          value={airports[key]}
          onChange={() => handleChange(key)}
          className="mb-3"
        />
      ))}
    </div>
  );
};

export default ConnectingAirportsFilter;
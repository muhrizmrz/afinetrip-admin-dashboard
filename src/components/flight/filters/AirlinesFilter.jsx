import React, { useState } from 'react';
import Checkbox from './Checkbox';

const AirlinesFilter = () => {
  const [airlines, setAirlines] = useState({
    austrian: false,
    airFrance: false,
    britishAirways: false,
    eurowings: false,
    abuDhabi: false,
    athens: false,
    bangalore: false,
  });

  const airlineOptions = [
    { label: 'Austrian (5)', price: '₹7,306', key: 'austrian' },
    { label: 'Air France (2)', price: '₹8,906', key: 'airFrance' },
    { label: 'British Airways (11)', price: '₹9,006', key: 'britishAirways' },
    { label: 'Eurowings (1)', price: '₹9,3210', key: 'eurowings' },
    { label: 'Abu Dhabi', price: '₹9,415', key: 'abuDhabi' },
    { label: 'Athens', price: '₹9,440', key: 'athens' },
    { label: 'Bangalore', price: '₹9,089', key: 'bangalore' },
  ];

  const handleChange = (key) => {
    setAirlines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-3 text-md text-[#15144E]">Airlines</h4>
      {airlineOptions.map(({ label, price, key }) => (
        <div key={key} className="flex items-center justify-between mb-3">
          <Checkbox
            label={label}
            value={airlines[key]}
            onChange={() => handleChange(key)}
          />
          <span className="font-semibold text-[#15144E]">{price}</span>
        </div>
      ))}
    </div>
  );
};

export default AirlinesFilter;
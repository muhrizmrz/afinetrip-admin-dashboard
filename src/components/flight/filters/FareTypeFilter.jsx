import React, { useState } from 'react';
import Checkbox from './Checkbox';

const FareTypeFilter = () => {
  const [fareTypes, setFareTypes] = useState({
    normal: false,
    branded: false,
    published: false,
    nonRef: false,
    others: false,
  });

  const handleChange = (key) => {
    setFareTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fareOptions = [
    { label: 'Normal Fare', key: 'normal' },
    { label: 'Branded Fare', key: 'branded' },
    { label: 'Published Fare', key: 'published' },
    { label: 'Non-ref Fare', key: 'nonRef' },
    { label: 'Others', key: 'others' },
  ];

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-3 text-md text-[#15144E]">Fare Type</h4>
      {fareOptions.map(({ label, key }) => (
        <Checkbox
          key={key}
          label={label}
          value={fareTypes[key]}
          onChange={() => handleChange(key)}
          className="mb-3"
        />
      ))}
    </div>
  );
};

export default FareTypeFilter;
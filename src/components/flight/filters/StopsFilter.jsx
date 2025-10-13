import React, { useState } from 'react';
import Checkbox from './Checkbox';

const StopsFilter = () => {
  const [stops, setStops] = useState({
    nonStop: false,
    oneStop: false,
    multipleStops: false,
  });

  const handleChange = (key) => {
    setStops((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-6 text-start">
      <h4 className="font-semibold mb-3 text-lg text-[#15144E]">Stops</h4>
      <div className="flex flex-row justify-center items-center">
        <Checkbox
          label="0 Stop"
          value={stops.nonStop}
          onChange={() => handleChange('nonStop')}
          className="text-sm" />
          
        <Checkbox
          label="1 Stop"
          value={stops.oneStop}
          onChange={() => handleChange('oneStop')}
          className="text-sm ms-2" />
        <Checkbox
          label="1+ Stop"
          value={stops.multipleStops}
          onChange={() => handleChange('multipleStops')}
          className="text-sm ms-2" />
      </div>
    </div>
  );
};

export default StopsFilter;
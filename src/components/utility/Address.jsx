import { useState } from "react";
import data from "../utility/countries_states_cities_min.json";

export default function LocationSelector({onChange}) {
  const [countries] = useState(data);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    onChange({
      country: selectedCountry,
      state: e.target.value,
      city: selectedCity,
    });
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    onChange({
      country: selectedCountry,
      state: selectedState,
      city: value,
    });
  };

  const selectedCountryObj = countries.find((c) => c.name === selectedCountry);
  const states = selectedCountryObj?.states || [];

  const selectedStateObj = states.find((s) => s.name === selectedState);
  const cities = selectedStateObj?.cities || [];

  return (
    <div className="flex flex-col gap-2 mb-4">
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={!selectedCountry}
        className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.id} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <select
        value={selectedCity}
        onChange={(e) => handleCityChange(e.target.value)}
        disabled={!selectedState}
        className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

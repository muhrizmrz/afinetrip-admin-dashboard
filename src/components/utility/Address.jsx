// src/components/utility/LocationSelector.jsx
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCountries,
  getStatesByCountry,
  getCitiesByState,
} from "../../services/locationService";

export default function LocationSelector({ value = {}, onChange }) {
  const countryId = String(value.country_id ?? "");
  const stateId = String(value.state_id ?? "");
  const cityId = String(value.city_id ?? "");

  const { data: countries = [] } = useQuery({
    queryKey: ["locations", "countries"],
    queryFn: getCountries,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: states = [], isLoading: loadingStates } = useQuery({
    queryKey: ["locations", "states", countryId],
    queryFn: () => getStatesByCountry(countryId),
    enabled: !!countryId && countryId !== "0",
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: cities = [], isLoading: loadingCities } = useQuery({
    queryKey: ["locations", "cities", stateId],
    queryFn: () => getCitiesByState(stateId),
    enabled: !!stateId && stateId !== "0",
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Handlers — only fire when user actually selects something different
  const handleCountryChange = (e) => {
    const newCountryId = e.target.value;
    if (newCountryId !== countryId) {
      onChange({
        country_id: newCountryId ? Number(newCountryId) : null,
        state_id: null,
        city_id: null,
      });
    }
  };

  const handleStateChange = (e) => {
    const newStateId = e.target.value;
    if (newStateId !== stateId) {
      onChange({
        country_id: value.country_id,
        state_id: newStateId ? Number(newStateId) : null,
        city_id: null,
      });
    }
  };

  const handleCityChange = (e) => {
    const newCityId = e.target.value;
    if (newCityId !== cityId) {
      onChange({
        country_id: value.country_id,
        state_id: value.state_id,
        city_id: newCityId ? Number(newCityId) : null,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Country */}
      <select
        value={countryId}
        onChange={handleCountryChange}
        className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* State */}
      <select
        value={stateId}
        onChange={handleStateChange}
        disabled={!countryId || loadingStates}
        className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
      >
        <option value="">
          {loadingStates ? "Loading states..." : "Select State"}
        </option>
        {states.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* City */}
      <select
        value={cityId}
        onChange={handleCityChange}
        disabled={!stateId || loadingCities}
        className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
      >
        <option value="">
          {loadingCities ? "Loading cities..." : "Select City"}
        </option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
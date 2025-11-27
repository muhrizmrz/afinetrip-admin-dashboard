import { gatewayClient } from "../lib/axiosClient";

export const getCountries = async () => {
  const { data } = await gatewayClient.get("/locations/countries");
  return data;
}

export const getStatesByCountry = async (countryId) => {
  const { data } = await gatewayClient.get(`/locations/countries/${countryId}/states`);
  return data;
}

export const getCitiesByState = async (stateId) => {
  const { data } = await gatewayClient.get(`/locations/states/${stateId}/cities`);
  return data;
}